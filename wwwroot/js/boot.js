// ============================================================
// boot.js
// Clock, global event handlers, Start menu, language picker,
// boot/welcome sequence, and app initialisation.
// Must be loaded last - depends on all other modules.
// ============================================================


// --- Clock ------------------------------------------------

// Updates the taskbar clock every second.
function updateClock() {
    const now     = new Date();
    const hours   = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const el = document.querySelector('.clock-time');
    if (el) el.textContent = `${hours}:${minutes}`;
}

updateClock();
setInterval(updateClock, 1000);


// --- General click delegation -----------------------------

// A single listener on the document handles all click interactions:
// closing menus, window control buttons, taskbar buttons, language
// popup items, and desktop icon selection.
document.addEventListener('click', (e) => {

    // Close Start menu when clicking outside it
    const startMenu = document.getElementById('start-menu');
    if (startMenu && !startMenu.classList.contains('hidden')) {
        if (!startMenu.contains(e.target) && !e.target.closest('#start-button')) {
            startMenu.classList.add('hidden');
        }
    }

    // Close language popup when clicking outside it
    const langPopup = document.getElementById('lang-popup');
    if (langPopup && !langPopup.classList.contains('hidden')) {
        if (!langPopup.contains(e.target) && !e.target.closest('#lang-btn')) {
            langPopup.classList.add('hidden');
        }
    }

    // Window control buttons (close / minimise / maximise / newtab)
    const actionEl = e.target.closest('[data-action]');
    const action = actionEl?.dataset.action;
    if (action) {
        const win = actionEl.closest('.window');
        if (action === 'close') {
            // Remove both the window element and its taskbar button
            document.querySelector(`[data-window-id="${win.id}"]`)?.remove();
            win.remove();
            setActiveWindow(null);
        } else if (action === 'minimize') {
            win.classList.add('minimized');
            setActiveWindow(null);
        } else if (action === 'maximize') {
            toggleMaximize(win);
        } else if (action === 'newtab') {
            window.open(actionEl.dataset.url, '_blank');
        } else if (action === 'oe-send') {
            const from    = win.querySelector('.oe-from')?.value.trim();
            const subject = win.querySelector('.oe-subject')?.value.trim();
            const body    = win.querySelector('.oe-body')?.value.trim();
            const website = win.querySelector('.oe-website')?.value ?? '';
            const status  = win.querySelector('.oe-status');
            if (!from || !subject || !body) {
                status.textContent = t('oe-error-empty');
                status.className = 'oe-status error';
                return;
            }
            status.textContent = t('oe-sending');
            status.className = 'oe-status';
            fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ from, subject, body, website })
            })
            .then(r => {
                if (r.ok) { status.textContent = t('oe-sent');       status.className = 'oe-status success'; }
                else      { status.textContent = t('oe-error-send'); status.className = 'oe-status error'; }
            })
            .catch(() => { status.textContent = t('oe-error-send'); status.className = 'oe-status error'; });
        }
        return;
    }

    // Taskbar window buttons
    const taskBtn = e.target.closest('.taskbar-window-btn');
    if (taskBtn) {
        const win = document.getElementById(taskBtn.dataset.windowId);
        if (!win) return;
        const isMinimized = win.classList.contains('minimized');
        const isActive    = taskBtn.classList.contains('active');

        if (isMinimized)   { win.classList.remove('minimized'); bringToFront(win); }
        else if (isActive) { win.classList.add('minimized');    setActiveWindow(null); }
        else               { bringToFront(win); }
        return;
    }

    // Language popup items
    const langItem = e.target.closest('.lang-popup-item');
    if (langItem) {
        setLang(langItem.dataset.lang);
        document.getElementById('lang-popup').classList.add('hidden');
        return;
    }

    // Desktop icon - single click selects it
    const icon = e.target.closest('.desktop-icon');
    if (icon) {
        document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
        icon.classList.add('selected');
        return;
    }

    // Clicking the empty desktop deselects all icons
    if (e.target.closest('#desktop') && !e.target.closest('.window')) {
        document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
    }
});


// --- Double-click handler ---------------------------------

document.addEventListener('dblclick', (e) => {
    // Double-click on a titlebar (not a control button) toggles maximise
    const titlebar = e.target.closest('.window-titlebar');
    if (titlebar && !e.target.dataset.action) {
        toggleMaximize(titlebar.closest('.window'));
        return;
    }

    // Double-click on a desktop icon opens the app or folder
    const icon = e.target.closest('.desktop-icon');
    if (!icon) return;
    if (icon.dataset.app)    openWindow(icon.dataset.app);
    else if (icon.dataset.folder) openFolder(icon.dataset.folder);
});


// --- Start menu toggle ------------------------------------

const startBtn = document.getElementById('start-button');
if (startBtn) {
    startBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent the document click handler from immediately closing it
        document.getElementById('start-menu').classList.toggle('hidden');
        document.getElementById('lang-popup').classList.add('hidden');
    });
}


// --- Language button (tray) --------------------------------

const langBtn = document.getElementById('lang-btn');
if (langBtn) {
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const popup = document.getElementById('lang-popup');
        if (popup.classList.contains('hidden')) {
            // Position the popup just above the language button
            const rect = langBtn.getBoundingClientRect();
            popup.style.left   = rect.left + 'px';
            popup.style.bottom = (window.innerHeight - rect.top + 2) + 'px';
            popup.classList.remove('hidden');
            document.getElementById('start-menu').classList.add('hidden');
        } else {
            popup.classList.add('hidden');
        }
    });
}


// --- Boot sequence ----------------------------------------

// Runs the boot screen → welcome screen → desktop animation.
// Uses an IIFE so t1/t2 are scoped and can be cancelled by skipIntro.
(function runBootSequence() {
    const bootEl    = document.getElementById('boot-screen');
    const welcomeEl = document.getElementById('welcome-screen');
    const desktop   = document.querySelector('.desktop-container');
    const skipBtn   = document.getElementById('skip-intro-btn');

    if (!bootEl) return;

    let t1, t2;

    // Immediately hides both intro screens and reveals the desktop.
    // Called either by the Skip button or by the normal timeout chain.
    function showDesktop() {
        clearTimeout(t1);
        clearTimeout(t2);
        bootEl.style.display    = 'none';
        welcomeEl.style.display = 'none';
        desktop.classList.add('booted');
        initShutdown?.();
    }

    // Wire the Skip Intro button
    if (skipBtn) skipBtn.addEventListener('click', showDesktop);

    // Step 1: hide boot screen after 5 s, show welcome screen
    t1 = setTimeout(() => {
        bootEl.style.display    = 'none';
        welcomeEl.style.display = 'flex';
        welcomeEl.style.opacity = '1';

        // Step 2: hide welcome screen after a further 3 s
        t2 = setTimeout(showDesktop, 3000);
    }, 5000);
}());


// --- Start menu: Turn Off Computer -------------------------

const shutdownBtn = document.getElementById('start-shutdown-btn');
if (shutdownBtn) {
    shutdownBtn.addEventListener('click', () => {
        document.getElementById('start-menu')?.classList.add('hidden');
        _triggerShutdownScreen?.();
    });
}


// --- Initialisation ----------------------------------------

// Apply the saved (or default) language to all data-i18n elements
applyTranslations();
