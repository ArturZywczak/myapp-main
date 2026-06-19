// ============================================================
// shutdown.js
// Battery-style server shutdown countdown — system tray.
// Depends on: i18n.js (t())
// Entry: initShutdown() — called from boot.js after showDesktop()
// ============================================================

const _POLL_MS    = 20_000;   // poll status every 20 s
const _BALLOON_MS = 30_000;   // auto-dismiss balloon after 30 s

const _ICONS = {
    full:   '/images/battery-full.png',
    medium: '/images/battery-medium.png',
    low:    '/images/battery-low.png',
    dead:   '/images/battery-dead.png',
    ssh:    '/images/battery-bolt-outlined.png',   // AC power — active SSH session
};

let _started       = false;
let _lastSecs      = null;
let _lastState     = null;   // 'full' | 'medium' | 'low' | 'dead' | 'ssh'
let _balloonTimer  = null;
let _extendPending = false;
let _shownLow      = false;
let _shownDead     = false;
let _shownSsh      = false;


// ─── State helpers ─────────────────────────────────────────

function _stateOf(secs, sshActive) {
    if (sshActive) return 'ssh';
    if (secs === null || secs <= 0) return 'dead';
    if (secs <= 300) return 'low';
    if (secs <= 600) return 'medium';
    return 'full';
}

function _fmtTime(secs) {
    if (!secs || secs <= 0) return t('battery-off');
    const m   = Math.ceil(secs / 60);
    const pct = Math.min(100, Math.round(secs / 900 * 100));
    return `${m} min (${pct}%)`;
}

function _canExtend() {
    return _lastSecs !== null && _lastSecs < 600 && _lastSecs > 0;
}


// ─── Icon & blink ─────────────────────────────────────────

function _setIcon(state) {
    const img = document.getElementById('battery-icon');
    if (!img) return;
    img.src = _ICONS[state];
    img.classList.toggle('battery-icon-ssh', state === 'ssh');
}

function _setBlink(on) {
    const img = document.getElementById('battery-icon');
    if (img) img.classList.toggle('battery-blink', on);
}


// ─── Shutdown screen ──────────────────────────────────────

function _triggerShutdownScreen() {
    const s = document.getElementById('shutdown-screen');
    if (!s) return;
    s.classList.remove('hidden');
    setTimeout(() => { window.location.href = 'https://rudex.click'; }, 10_000);
}


// ─── Overlay positioning ──────────────────────────────────

// Positions el (balloon or menu) just above the battery tray icon.
function _positionAbove(el) {
    const bat = document.getElementById('shutdown-battery');
    if (!bat || !el) return;
    const r = bat.getBoundingClientRect();
    el.style.right  = `${window.innerWidth  - r.right}px`;
    el.style.bottom = `${window.innerHeight - r.top + 6}px`;
}


// ─── Balloon ──────────────────────────────────────────────

function _showBalloon(type) {
    const b = document.getElementById('battery-balloon');
    if (!b) return;
    clearTimeout(_balloonTimer);

    const iconEl   = b.querySelector('.bb-icon');
    const titleEl  = b.querySelector('.bb-title');
    const bodyEl   = b.querySelector('.bb-body');
    const hintEl   = b.querySelector('.bb-hint');
    const extendEl = b.querySelector('.bb-extend');

    // Reset before each show
    if (iconEl)   iconEl.textContent = '';
    if (hintEl)   hintEl.classList.add('hidden');
    if (extendEl) extendEl.classList.add('hidden');

    switch (type) {
        case 'initial':
            if (titleEl) titleEl.textContent = t('balloon-initial-title');
            if (bodyEl)  bodyEl.textContent  = t('balloon-initial-body');
            break;

        case 'low':
            if (iconEl)  iconEl.textContent  = '⚠';
            if (titleEl) titleEl.textContent = t('balloon-low-title');
            if (bodyEl)  bodyEl.textContent  = t('balloon-low-body');
            if (extendEl) {
                extendEl.textContent = t('battery-extend');
                extendEl.disabled    = _extendPending;
                extendEl.classList.remove('hidden');
            }
            break;

        case 'dead':
            if (iconEl)  iconEl.textContent  = '⚠';
            if (titleEl) titleEl.textContent = t('balloon-dead-title');
            if (bodyEl)  bodyEl.textContent  = t('balloon-dead-body');
            if (hintEl)  {
                hintEl.textContent = t('balloon-dead-hint');
                hintEl.classList.remove('hidden');
            }
            break;

        case 'ssh':
            if (iconEl)  iconEl.textContent  = '🔌';
            if (titleEl) titleEl.textContent = t('balloon-ssh-title');
            if (bodyEl)  bodyEl.textContent  = t('balloon-ssh-body');
            break;
    }

    b.classList.remove('hidden');
    _positionAbove(b);
    _balloonTimer = setTimeout(_hideBalloon, _BALLOON_MS);
}

function _hideBalloon() {
    clearTimeout(_balloonTimer);
    const b = document.getElementById('battery-balloon');
    if (b) b.classList.add('hidden');
}


// ─── Context menu ─────────────────────────────────────────

function _refreshMenu() {
    const timeEl   = document.getElementById('battery-menu-remaining');
    const iconEl   = document.getElementById('battery-menu-icon');
    const infoEl   = document.querySelector('.battery-menu-info');
    const extendEl = document.getElementById('battery-menu-extend');

    if (iconEl) iconEl.src = _ICONS[_lastState ?? 'full'];

    if (_lastState === 'ssh') {
        if (timeEl)   timeEl.textContent = t('battery-ssh-remaining');
        if (infoEl)   infoEl.textContent = t('battery-ssh-info');
        if (extendEl) { extendEl.textContent = t('battery-extend'); extendEl.disabled = true; }
    } else {
        if (timeEl)   timeEl.textContent = _fmtTime(_lastSecs);
        if (infoEl)   infoEl.textContent = t('battery-info');
        if (extendEl) {
            extendEl.textContent = t('battery-extend');
            extendEl.disabled = !_canExtend() || _extendPending;
        }
    }
}

function _showMenu() {
    const m = document.getElementById('battery-menu');
    if (!m) return;
    _refreshMenu();
    _positionAbove(m);
    m.classList.remove('hidden');
}

function _hideMenu() {
    const m = document.getElementById('battery-menu');
    if (m) m.classList.add('hidden');
}


// ─── Apply status ─────────────────────────────────────────

function _applyStatus(data) {
    const secs      = (data && typeof data.remaining_seconds === 'number') ? data.remaining_seconds : null;
    const sshActive = !!(data?.ssh_active);
    const newState  = _stateOf(secs, sshActive);
    const prevState = _lastState;

    _lastSecs  = secs;
    _lastState = newState;

    _setIcon(newState);
    _setBlink(newState === 'dead');

    // Keep open menu fresh
    const m = document.getElementById('battery-menu');
    if (m && !m.classList.contains('hidden')) _refreshMenu();

    // SSH becomes active: reset low/dead flags so balloons fire again after SSH ends
    if (prevState !== null && prevState !== 'ssh' && newState === 'ssh') {
        _shownLow  = false;
        _shownDead = false;
        if (!_shownSsh) { _shownSsh = true; _showBalloon('ssh'); }
    }

    // SSH disconnected → allow the SSH balloon to fire again next time
    if (prevState === 'ssh' && newState !== 'ssh') {
        _shownSsh = false;
    }

    // State-change balloons — fire once per countdown cycle (ignore SSH state)
    if (prevState !== null && newState !== prevState && newState !== 'ssh') {
        if (newState === 'low'  && !_shownLow)  { _shownLow  = true; _showBalloon('low');  }
        if (newState === 'dead' && !_shownDead) { _shownDead = true; _showBalloon('dead'); _triggerShutdownScreen(); }
    }
}


// ─── API ──────────────────────────────────────────────────

async function _apiFetch(path, method) {
    try {
        const opts = method ? { method } : undefined;
        const r    = await fetch(path, opts);
        const json = await r.json().catch(() => null);
        if (!r.ok) return json?.status ?? null;   // 400 from /extend: {error, status}
        return json;
    } catch {
        return null;   // network/timeout → treat as server dead
    }
}


// ─── Extend ───────────────────────────────────────────────

async function _doExtend() {
    if (_extendPending) return;
    _extendPending = true;

    document.querySelectorAll('.bb-extend, #battery-menu-extend')
        .forEach(btn => { btn.disabled = true; });

    const data = await _apiFetch('/api/shutdown/extend', 'POST');
    _extendPending = false;

    // New countdown → balloons can fire again
    _shownLow  = false;
    _shownDead = false;

    _hideBalloon();
    _hideMenu();
    _applyStatus(data);
}


// ─── Entry point ──────────────────────────────────────────

async function initShutdown() {
    if (_started) return;
    _started = true;

    // Battery tray click: close balloon if visible, else toggle menu
    document.getElementById('shutdown-battery')
        ?.addEventListener('click', e => {
            e.stopPropagation();
            const b = document.getElementById('battery-balloon');
            if (b && !b.classList.contains('hidden')) {
                _hideBalloon();
            } else {
                const m = document.getElementById('battery-menu');
                if (m && !m.classList.contains('hidden')) _hideMenu();
                else _showMenu();
            }
        });

    // Balloon: close & extend buttons
    document.querySelector('.bb-close')
        ?.addEventListener('click', e => { e.stopPropagation(); _hideBalloon(); });
    document.querySelector('.bb-extend')
        ?.addEventListener('click', e => { e.stopPropagation(); _doExtend(); });

    // Menu: extend button
    document.getElementById('battery-menu-extend')
        ?.addEventListener('click', e => { e.stopPropagation(); _doExtend(); });

    // Click outside → close menu
    document.addEventListener('click', e => {
        if (!e.target.closest('#battery-menu') &&
            !e.target.closest('#shutdown-battery')) {
            _hideMenu();
        }
    });

    // POST /reset — sets countdown to 15 min, returns immediate status
    const init = await _apiFetch('/api/shutdown/reset', 'POST');

    if (init !== null) {
        _applyStatus(init);
        // Don't show "server will shut down" balloon if SSH is already active
        if (!init.ssh_active) _showBalloon('initial');
    } else {
        // Server already unresponsive at page load
        _shownDead = true;
        _applyStatus(null);
        _showBalloon('dead');
    }

    // Poll every 20 s
    setInterval(async () => {
        _applyStatus(await _apiFetch('/api/shutdown/status'));
    }, _POLL_MS);
}
