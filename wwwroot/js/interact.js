// ============================================================
// interact.js
// Mouse and touch interaction: drag, resize, maximize toggle.
// Depends on: windows.js (bringToFront)
// ============================================================


// --- State ------------------------------------------------

let dragData   = null; // set while a drag operation is in progress
let resizeData = null; // set while a resize operation is in progress


// --- Maximize / restore -----------------------------------

// Toggles the .maximized class.
// When maximised, CSS !important rules override the inline
// top/left/width/height so the window fills the screen.
// When restored, the inline styles take over again.
function toggleMaximize(win) {
    win.classList.toggle('maximized');
}


// --- Resize helpers ---------------------------------------

// Captures the window's current geometry and disables pointer
// events on any iframes so mouse events don't get swallowed.
function startResize(clientX, clientY, win, dir) {
    const rect = win.getBoundingClientRect();
    resizeData = {
        win, dir, clientX, clientY,
        startW: rect.width,
        startH: rect.height,
        startL: win.offsetLeft,
        startT: win.offsetTop
    };
    // Iframes capture mouse events - disable them during resize
    document.querySelectorAll('iframe').forEach(f => f.style.pointerEvents = 'none');
}

// Calculates and applies the new size/position based on how far
// the pointer has moved since startResize() was called.
function applyResize(clientX, clientY) {
    const { win, dir, clientX: sx, clientY: sy,
            startW, startH, startL, startT } = resizeData;

    const dx = clientX - sx;
    const dy = clientY - sy;
    const minW = 220; // minimum window width
    const minH = 120; // minimum window height

    // East / West edges change width (and left position for west)
    if (dir.includes('e')) win.style.width  = Math.max(minW, startW + dx) + 'px';
    if (dir.includes('s')) win.style.height = Math.max(minH, startH + dy) + 'px';
    if (dir.includes('w')) {
        const w = Math.max(minW, startW - dx);
        win.style.width = w + 'px';
        win.style.left  = (startL + startW - w) + 'px';
    }
    if (dir.includes('n')) {
        const h = Math.max(minH, startH - dy);
        win.style.height = h + 'px';
        win.style.top    = (startT + startH - h) + 'px';
    }
}


// --- Mouse events -----------------------------------------

document.addEventListener('mousedown', (e) => {
    // Bring the clicked window to the front
    const clickedWin = e.target.closest('.window');
    if (clickedWin && !e.target.dataset.action && !clickedWin.classList.contains('minimized')) {
        bringToFront(clickedWin);
    }

    // Check for a resize-handle click first
    const handle = e.target.closest('.resize-handle');
    if (handle) {
        const win = handle.closest('.window');
        if (!win.classList.contains('maximized')) {
            startResize(e.clientX, e.clientY, win, handle.dataset.dir);
        }
        return;
    }

    // Otherwise check for a titlebar drag
    const titlebar = e.target.closest('.window-titlebar');
    if (!titlebar || e.target.dataset.action) return; // ignore control buttons
    const win = titlebar.closest('.window');
    if (win.classList.contains('maximized')) return;  // can't drag a maximised window

    // Disable iframe pointer events so dragging over an iframe stays smooth
    document.querySelectorAll('iframe').forEach(f => f.style.pointerEvents = 'none');

    dragData = {
        win,
        offsetX: e.clientX - win.offsetLeft,
        offsetY: e.clientY - win.offsetTop
    };
});

document.addEventListener('mousemove', (e) => {
    if (dragData) {
        dragData.win.style.left = (e.clientX - dragData.offsetX) + 'px';
        dragData.win.style.top  = (e.clientY - dragData.offsetY) + 'px';
    }
    if (resizeData) {
        applyResize(e.clientX, e.clientY);
    }
});

document.addEventListener('mouseup', () => {
    dragData = resizeData = null;
    // Re-enable pointer events on iframes
    document.querySelectorAll('iframe').forEach(f => f.style.pointerEvents = '');
});



// --- Touch events -----------------------------------------

// Tracks the previous tap for double-tap detection
let lastTapTime = 0;
let lastTapEl   = null;

document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];

    // Touch on a resize handle - start resize, prevent page scroll
    const handle = e.target.closest('.resize-handle');
    if (handle) {
        e.preventDefault();
        const win = handle.closest('.window');
        if (!win.classList.contains('maximized')) {
            startResize(touch.clientX, touch.clientY, win, handle.dataset.dir);
        }
        return;
    }

    // Touch on the titlebar - start drag, prevent page scroll
    const titlebar = e.target.closest('.window-titlebar');
    if (titlebar && !e.target.dataset.action) {
        const win = titlebar.closest('.window');
        if (win.classList.contains('maximized')) return;
        e.preventDefault();
        bringToFront(win);
        dragData = {
            win,
            offsetX: touch.clientX - win.offsetLeft,
            offsetY: touch.clientY - win.offsetTop
        };
    }
}, { passive: false });

document.addEventListener('touchmove', (e) => {
    if (!dragData && !resizeData) return;
    e.preventDefault(); // prevents the whole page from scrolling while moving a window
    const touch = e.touches[0];
    if (dragData)   {
        dragData.win.style.left = (touch.clientX - dragData.offsetX) + 'px';
        dragData.win.style.top  = (touch.clientY - dragData.offsetY) + 'px';
    }
    if (resizeData) applyResize(touch.clientX, touch.clientY);
}, { passive: false });

document.addEventListener('touchend', (e) => {
    // End both drag and resize
    dragData = resizeData = null;
    document.querySelectorAll('iframe').forEach(f => f.style.pointerEvents = '');

    // Double-tap on the titlebar toggles maximise
    // (dblclick does not fire reliably on touch devices)
    const now      = Date.now();
    const titlebar = e.target.closest('.window-titlebar');

    if (titlebar && !e.target.dataset.action) {
        if (now - lastTapTime < 350 && lastTapEl === titlebar) {
            // Second tap within 350 ms on the same titlebar - maximise/restore
            toggleMaximize(titlebar.closest('.window'));
            lastTapTime = 0;
            lastTapEl   = null;
            return;
        }
        // Record this as the first tap
        lastTapTime = now;
        lastTapEl   = titlebar;
    } else {
        // Tapped somewhere other than a titlebar - reset the tracker
        lastTapTime = 0;
        lastTapEl   = null;
    }
});
