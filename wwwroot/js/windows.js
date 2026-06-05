// ============================================================
// windows.js
// Window creation and management.
// Depends on: i18n.js (t()), registry.js (apps, folders)
// ============================================================


// --- State ------------------------------------------------

let windowCounter = 0;  // increments for each new window; used to generate unique IDs
let topZIndex     = 100; // tracks the highest z-index currently in use


// --- Helpers ----------------------------------------------

// Returns an <img> tag for icon paths (starting with "/") or a
// plain <span> for emoji/text fallbacks.
function iconHtml(src, size) {
    const px = size || 16;
    if (!src) return '';
    return src.startsWith('/')
        ? `<img src="${src}" style="width:${px}px;height:${px}px;vertical-align:middle;flex-shrink:0;" alt="" />`
        : `<span>${src}</span>`;
}

// Appends 8 transparent resize-handle divs to a window element.
// Called once per window right after it is created.
function addResizeHandles(win) {
    ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'].forEach(dir => {
        const h = document.createElement('div');
        h.className = `resize-handle resize-${dir}`;
        h.dataset.dir = dir;
        win.appendChild(h);
    });
}


// --- Open a registered app window -------------------------

// Creates a window element from the apps{} registry entry,
// adds it to the desktop and taskbar, then makes it active.
function openWindow(appId) {
    const app = apps[appId];
    if (!app) return;

    windowCounter++;
    const winId  = `win-${windowCounter}`;
    const offset = ((windowCounter - 1) % 10) * 20; // cascade new windows
    const title  = t(app.titleKey);
    const contentHtml = typeof app.content === 'function' ? app.content() : app.content;

    const win = document.createElement('div');
    win.className = 'window' + (app.windowClass ? ' ' + app.windowClass : '');
    win.id = winId;
    win.style.top    = (50 + offset) + 'px';
    win.style.left   = (50 + offset) + 'px';
    if (app.width)  win.style.width  = app.width  + 'px';
    if (app.height) win.style.height = app.height + 'px';

    win.innerHTML = `
        <div class="window-titlebar">
            <div class="window-title">
                ${iconHtml(app.icon, 16)}
                <span data-i18n="${app.titleKey}">${title}</span>
            </div>
            <div class="window-controls">
                <button class="window-btn window-btn-min" data-action="minimize">_</button>
                <button class="window-btn window-btn-max" data-action="maximize">□</button>
                <button class="window-btn window-btn-close" data-action="close">✕</button>
            </div>
        </div>
        <div class="window-content">${contentHtml}</div>
    `;

    // Pre-fill the notepad textarea if the app has a contentKey
    if (app.contentKey) {
        const ta = win.querySelector('.notepad-textarea');
        if (ta) ta.value = t(app.contentKey);
    }

    topZIndex++;
    win.style.zIndex = topZIndex;

    // Add a matching button to the taskbar
    const btn = document.createElement('button');
    btn.className = 'taskbar-window-btn';
    btn.textContent = title;
    btn.dataset.windowId = winId;
    btn.dataset.i18n = app.titleKey;
    document.querySelector('.taskbar-windows').appendChild(btn);

    addResizeHandles(win);
    document.getElementById('desktop').appendChild(win);
    setActiveWindow(winId);
}


// --- Open a folder (Explorer) window ----------------------

// Builds the full XP Explorer chrome — menu bar, toolbar,
// address bar, sidebar panels, and an icon grid.
// Double-clicking a grid item calls openProjectWindow().
function openFolder(folderId) {
    const folder = folders[folderId];
    if (!folder) return;

    windowCounter++;
    const winId  = `win-${windowCounter}`;
    const offset = ((windowCounter - 1) % 10) * 20;
    const title  = t(folder.titleKey);

    // Build the file-grid HTML; store name/icon/url/app as data attributes.
    // Items with a url open in an iframe window; items with an app key open
    // a registered app window (e.g. a notepad).
    const itemsHtml = folder.items.map(item => {
        const img = item.icon
            ? `<img src="${item.icon}" style="width:32px;height:32px;" alt="" />`
            : `<div class="icon-missing">✗</div>`;
        return `<div class="explorer-item"
                     data-url="${item.url  || ''}"
                     data-app="${item.app  || ''}"
                     data-name="${item.name}"
                     data-icon="${item.icon || ''}">
            ${img}
            <div class="explorer-item-label">${item.name}</div>
        </div>`;
    }).join('');

    const win = document.createElement('div');
    win.className = 'window explorer-window';
    win.id = winId;
    win.style.top    = (60 + offset) + 'px';
    win.style.left   = (80 + offset) + 'px';
    win.style.width  = '650px';
    win.style.height = '480px';

    win.innerHTML = `
        <div class="window-titlebar">
            <div class="window-title">
                ${iconHtml(folder.icon, 16)}
                <span data-i18n="${folder.titleKey}">${title}</span>
            </div>
            <div class="window-controls">
                <button class="window-btn window-btn-min" data-action="minimize">_</button>
                <button class="window-btn window-btn-max" data-action="maximize">□</button>
                <button class="window-btn window-btn-close" data-action="close">✕</button>
            </div>
        </div>
        <div class="app-menubar">
            <span class="app-menubar-item" data-i18n="menu-file">${t('menu-file')}</span>
            <span class="app-menubar-item" data-i18n="menu-edit">${t('menu-edit')}</span>
            <span class="app-menubar-item" data-i18n="menu-view">${t('menu-view')}</span>
            <span class="app-menubar-item" data-i18n="menu-favorites">${t('menu-favorites')}</span>
            <span class="app-menubar-item" data-i18n="menu-tools">${t('menu-tools')}</span>
            <span class="app-menubar-item" data-i18n="menu-help">${t('menu-help')}</span>
        </div>
        <div class="explorer-toolbar">
            <button class="explorer-toolbar-btn">${iconHtml('/images/IconPack/Back.png', 16)}<span data-i18n="toolbar-back">${t('toolbar-back')}</span></button>
            <button class="explorer-toolbar-btn">${iconHtml('/images/IconPack/Forward.png', 16)}<span data-i18n="toolbar-forward">${t('toolbar-forward')}</span></button>
            <button class="explorer-toolbar-btn">${iconHtml('/images/IconPack/Up.png', 16)}<span data-i18n="toolbar-up">${t('toolbar-up')}</span></button>
            <div class="explorer-toolbar-sep"></div>
            <button class="explorer-toolbar-btn">${iconHtml('/images/IconPack/Search.png', 16)}<span data-i18n="toolbar-search">${t('toolbar-search')}</span></button>
            <button class="explorer-toolbar-btn">${iconHtml('/images/IconPack/Folder View.png', 16)}<span data-i18n="toolbar-folders">${t('toolbar-folders')}</span></button>
        </div>
        <div class="explorer-addressbar">
            <span class="explorer-addressbar-label" data-i18n="addressbar-label">${t('addressbar-label')}</span>
            <div class="explorer-addressbar-field">
                ${iconHtml(folder.icon, 16)}
                <span><span data-i18n="desktop-path">${t('desktop-path')}</span>${title}</span>
            </div>
        </div>
        <div class="explorer-body">
            <div class="explorer-sidebar">
                <div class="explorer-panel">
                    <div class="explorer-panel-header" data-i18n="panel-system-tasks">${t('panel-system-tasks')}</div>
                    <div class="explorer-panel-body">
                        <div class="explorer-panel-item">${iconHtml('/images/IconPack/New Folder.png', 16)} <span data-i18n="panel-new-folder">${t('panel-new-folder')}</span></div>
                        <div class="explorer-panel-item">${iconHtml('/images/IconPack/Publish to web.png', 16)} <span data-i18n="panel-publish">${t('panel-publish')}</span></div>
                        <div class="explorer-panel-item">${iconHtml('/images/IconPack/Email.png', 16)} <span data-i18n="panel-share">${t('panel-share')}</span></div>
                    </div>
                </div>
                <div class="explorer-panel">
                    <div class="explorer-panel-header" data-i18n="panel-other-places">${t('panel-other-places')}</div>
                    <div class="explorer-panel-body">
                        <div class="explorer-panel-item">${iconHtml('/images/IconPack/Desktop.png', 16)} <span data-i18n="panel-desktop">${t('panel-desktop')}</span></div>
                        <div class="explorer-panel-item">${iconHtml('/images/IconPack/My Documents.png', 16)} <span data-i18n="panel-my-docs">${t('panel-my-docs')}</span></div>
                        <div class="explorer-panel-item">${iconHtml('/images/IconPack/My Computer.png', 16)} <span data-i18n="panel-my-computer">${t('panel-my-computer')}</span></div>
                        <div class="explorer-panel-item">${iconHtml('/images/IconPack/My Network Places.png', 16)} <span data-i18n="panel-network">${t('panel-network')}</span></div>
                    </div>
                </div>
                <div class="explorer-panel">
                    <div class="explorer-panel-header" data-i18n="panel-details">${t('panel-details')}</div>
                    <div class="explorer-panel-body explorer-panel-details">
                        <strong>${title}</strong><br />Folder
                    </div>
                </div>
            </div>
            <div class="explorer-content">
                ${itemsHtml}
            </div>
        </div>
    `;

    topZIndex++;
    win.style.zIndex = topZIndex;

    const btn = document.createElement('button');
    btn.className = 'taskbar-window-btn';
    btn.textContent = title;
    btn.dataset.windowId = winId;
    btn.dataset.i18n = folder.titleKey;
    document.querySelector('.taskbar-windows').appendChild(btn);

    addResizeHandles(win);
    document.getElementById('desktop').appendChild(win);
    setActiveWindow(winId);

    // Wire double-click on each grid item.
    // Items with data-app open a registered app window (notepad etc.).
    // Items with data-url open in a maximised iframe window.
    win.querySelectorAll('.explorer-item').forEach(el => {
        el.addEventListener('dblclick', () => {
            if (el.dataset.app) { openWindow(el.dataset.app); return; }
            if (el.dataset.url)  { openProjectWindow({ name: el.dataset.name, icon: el.dataset.icon, url: el.dataset.url }); }
        });
    });
}


// --- Open a project in an iframe window -------------------

// Creates a maximised window that embeds a sub-application via iframe.
// The window starts maximised; clicking the restore button returns it
// to 1000x650 px at the cascade position stored in its inline styles.
function openProjectWindow(item) {
    windowCounter++;
    const winId  = `win-${windowCounter}`;
    const offset = ((windowCounter - 1) % 10) * 20;

    // Strip ".exe" suffix for the titlebar label
    const title = item.name.replace(/\.exe$/i, '');

    const win = document.createElement('div');
    win.className = 'window project-window';
    win.id = winId;

    // These inline styles define the restore size/position.
    // They are overridden by .maximized (!important) while maximised,
    // and used again when the user restores the window.
    win.style.top    = (50 + offset) + 'px';
    win.style.left   = (50 + offset) + 'px';
    win.style.width  = '1000px';
    win.style.height = '650px';

    win.innerHTML = `
        <div class="window-titlebar">
            <div class="window-title">
                ${iconHtml(item.icon, 16)}
                <span>${title}</span>
            </div>
            <div class="window-controls">
                <button class="window-btn window-btn-min" data-action="minimize">_</button>
                <button class="window-btn window-btn-max" data-action="maximize">⧉</button>
                <button class="window-btn window-btn-close" data-action="close">✕</button>
            </div>
        </div>
        <div class="window-content window-content-iframe">
            <iframe src="${item.url}" loading="lazy"
                    style="width:100%;height:100%;border:none;display:block;"></iframe>
        </div>
    `;

    // Start maximised — restore falls back to the inline styles above
    win.classList.add('maximized');

    topZIndex++;
    win.style.zIndex = topZIndex;

    const btn = document.createElement('button');
    btn.className = 'taskbar-window-btn';
    btn.textContent = title;
    btn.dataset.windowId = winId;
    document.querySelector('.taskbar-windows').appendChild(btn);

    addResizeHandles(win);
    document.getElementById('desktop').appendChild(win);
    setActiveWindow(winId);
}


// --- Z-index and focus management -------------------------

// Raises a window to the top of the stack and marks it active.
function bringToFront(win) {
    topZIndex++;
    win.style.zIndex = topZIndex;
    setActiveWindow(win.id);
}

// Toggles active/inactive CSS on all windows and taskbar buttons.
// Pass null to deactivate everything (e.g. after closing the last window).
function setActiveWindow(winId) {
    document.querySelectorAll('.taskbar-window-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.windowId === winId);
    });
    document.querySelectorAll('.window').forEach(w => {
        w.classList.toggle('inactive', w.id !== winId);
    });
}
