// === TRANSLATIONS ===
const translations = {
    pl: {
        // desktop icons
        'icon-my-computer':   'Mój komputer',
        'icon-notepad':       'Notatnik',
        'icon-my-projects':   'Moje projekty',
        'icon-cv-pl':         'CV Polskie.pdf',
        'icon-cv-en':         'CV English.pdf',
        'icon-project-info':  'O projekcie.txt',

        // start menu programs
        'start-prog-ie':     'Internet Explorer',
        'start-prog-wordpad':'Wordpad',
        'start-prog-mpc':    'Media Player Classic',
        'start-prog-adobe':  'Adobe Reader',
        'start-prog-oe':     'Outlook Express',
        'start-prog-calc':   'Kalkulator',
        'start-prog-paint':  'Paint',
        'start-prog-tour':   'Samouczek systemu Windows XP',
        'start-allprograms': 'Wszystkie programy',

        // start menu links
        'start-my-pictures':    'Moje obrazy',
        'start-my-music':       'Moja muzyka',
        'start-my-computer':    'Mój komputer',
        'start-control-panel':  'Panel sterowania',
        'start-display':        'Ustawienia ekranu',
        'start-help':           'Pomoc i obsługa techniczna',
        'start-installer':      'Instalator',
        'start-search':         'Wyszukaj',
        'start-run':            'Uruchom…',

        // footer buttons
        'start-logoff':   'Wyloguj',
        'start-shutdown': 'Wyłącz komputer',

        // welcome
        'welcome-text': 'Zapraszamy',

        // app window titles
        'app-my-computer':  'Mój komputer',
        'app-notepad':      'Bez tytułu — Notatnik',
        'app-cv-pl':        'CV Polskie (Polski)',
        'app-cv-en':        'CV Polskie (English)',
        'app-project-info': 'O projekcie — Notatnik',
        'folder-my-projects': 'Moje projekty',

        // app menu bar
        'menu-file':      'Plik',
        'menu-edit':      'Edycja',
        'menu-format':    'Format',
        'menu-view':      'Widok',
        'menu-help':      'Pomoc',
        'menu-favorites': 'Ulubione',
        'menu-tools':     'Narzędzia',

        // explorer toolbar
        'toolbar-back':    'Wstecz',
        'toolbar-forward': 'Dalej',
        'toolbar-up':      'W górę',
        'toolbar-search':  'Wyszukaj',
        'toolbar-folders': 'Foldery',

        // explorer sidebar
        'panel-system-tasks': 'Zadania systemowe',
        'panel-new-folder':   'Utwórz nowy folder',
        'panel-publish':      'Opublikuj folder w sieci Web',
        'panel-share':        'Udostępnij folder',
        'panel-other-places': 'Inne miejsca',
        'panel-desktop':      'Pulpit',
        'panel-my-docs':      'Moje dokumenty',
        'panel-my-computer':  'Mój komputer',
        'panel-network':      'Miejsca sieciowe',
        'panel-details':      'Szczegóły',

        // address bar
        'addressbar-label': 'Adres',
        'desktop-path':     'C:\\Pulpit\\',

        // language popup
        'lang-pl': 'Polski',
        'lang-en': 'English',

        // project info text
        'project-info-text':
`=== Pulpit Windows XP ===

Projekt to interaktywna strona internetowa symulująca
klasyczny interfejs Windows XP, zbudowana w ASP.NET Core 8.0.

--- Technologie ---
Backend  : ASP.NET Core 8.0 (C#)
Frontend : HTML / CSS / JavaScript (vanilla)
Motyw    : Windows XP – klasyczny Luna

--- Funkcje ---
• Animowana sekwencja startowa (boot + ekran powitalny)
• System okien: przeciąganie, min/max, zarządzanie z-indeksem
• Menu Start z układem dwukolumnowym
• Pasek zadań z zegarem i przyciskami okien
• Notatnik z paskiem menu
• Eksplorator folderów (styl XP)
• Zmiana języka: Polski / English
• Ikony z oryginalnego pakietu Windows XP
• Przeglądarka PDF - moje CV

--- Projekty ---
Work Time            – ewidencja czasu pracy
Ekstraklasa Terminal – tabela ligowa, symulacje Monte Carlo
Pracownicy           – zarządzanie pracownikami
CS Cases             – skrzynki CS:GO
Ekstraklasa API      – REST API z danymi ligowymi

Autor: Artur Żywczak`
    },

    en: {
        // desktop icons
        'icon-my-computer':   'My Computer',
        'icon-notepad':       'Notepad',
        'icon-my-projects':   'My Projects',
        'icon-cv-pl':         'CV Polish.pdf',
        'icon-cv-en':         'CV English.pdf',
        'icon-project-info':  'About Project.txt',

        // start menu programs
        'start-prog-ie':     'Internet Explorer',
        'start-prog-wordpad':'Wordpad',
        'start-prog-mpc':    'Media Player Classic',
        'start-prog-adobe':  'Adobe Reader',
        'start-prog-oe':     'Outlook Express',
        'start-prog-calc':   'Calculator',
        'start-prog-paint':  'Paint',
        'start-prog-tour':   'Windows XP Tour',
        'start-allprograms': 'All Programs',

        // start menu links
        'start-my-pictures':    'My Pictures',
        'start-my-music':       'My Music',
        'start-my-computer':    'My Computer',
        'start-control-panel':  'Control Panel',
        'start-display':        'Display Settings',
        'start-help':           'Help and Support',
        'start-installer':      'Installer',
        'start-search':         'Search',
        'start-run':            'Run…',

        // footer buttons
        'start-logoff':   'Log Off',
        'start-shutdown': 'Turn Off Computer',

        // welcome
        'welcome-text': 'Welcome',

        // app window titles
        'app-my-computer':  'My Computer',
        'app-notepad':      'Untitled — Notepad',
        'app-cv-pl':        'CV — webox (Polish)',
        'app-cv-en':        'CV — webox (English)',
        'app-project-info': 'About Project — Notepad',
        'folder-my-projects': 'My Projects',

        // app menu bar
        'menu-file':      'File',
        'menu-edit':      'Edit',
        'menu-format':    'Format',
        'menu-view':      'View',
        'menu-help':      'Help',
        'menu-favorites': 'Favorites',
        'menu-tools':     'Tools',

        // explorer toolbar
        'toolbar-back':    'Back',
        'toolbar-forward': 'Forward',
        'toolbar-up':      'Up',
        'toolbar-search':  'Search',
        'toolbar-folders': 'Folders',

        // explorer sidebar
        'panel-system-tasks': 'File and Folder Tasks',
        'panel-new-folder':   'Make a new folder',
        'panel-publish':      'Publish this folder to the Web',
        'panel-share':        'Share this folder',
        'panel-other-places': 'Other Places',
        'panel-desktop':      'Desktop',
        'panel-my-docs':      'My Documents',
        'panel-my-computer':  'My Computer',
        'panel-network':      'My Network Places',
        'panel-details':      'Details',

        // address bar
        'addressbar-label': 'Address',
        'desktop-path':     'C:\\Desktop\\',

        // language popup
        'lang-pl': 'Polish',
        'lang-en': 'English',

        // project info text
        'project-info-text':
`=== Windows XP Desktop ===

An interactive website simulating the classic Windows XP
interface, built with ASP.NET Core 8.0.

--- Technologies ---
Backend  : ASP.NET Core 8.0 (C#)
Frontend : HTML / CSS / JavaScript (vanilla)
Theme    : Windows XP – classic Luna
Server   : Kestrel

--- Features ---
• Animated startup sequence (boot + welcome screen)
• Window system: drag, min/max, z-index management
• Start Menu with two-column layout
• Taskbar with live clock and window buttons
• Notepad with menu bar
• Folder Explorer (XP style)
• Language switcher: Polish / English
• Icons from the original Windows XP icon pack
• PDF viewer – my CV

--- Projects ---
Work Time            – work time tracking
Ekstraklasa Terminal – league table, Monte Carlo simulations
Pracownicy           – employee management
CS Cases             – CS:GO cases
Ekstraklasa API      – REST API with league data

Author: webox`
    }
};

let currentLang = localStorage.getItem('xp-lang') || 'pl';

function t(key) {
    return translations[currentLang]?.[key] ?? translations.pl?.[key] ?? key;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (key) el.textContent = t(key);
    });
    // update lang button label
    const lbl = document.getElementById('lang-label');
    if (lbl) lbl.textContent = currentLang.toUpperCase();
}

function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('xp-lang', lang);
    // mark active in popup
    document.querySelectorAll('.lang-popup-item').forEach(el => {
        el.classList.toggle('active', el.dataset.lang === lang);
    });
    applyTranslations();
}

// === CLOCK ===
function updateClock() {
    const now = new Date();
    const hours   = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const el = document.querySelector('.clock-time');
    if (el) el.textContent = `${hours}:${minutes}`;
}
updateClock();
setInterval(updateClock, 1000);

// === APP REGISTRY ===
const apps = {
    'my-computer': {
        titleKey: 'app-my-computer',
        icon: '/images/IconPack/My Computer.png',
        width: 500,
        height: 350,
        content: '<p style="padding:10px;">Zawartość: Mój komputer</p>'
    },
    'notepad': {
        titleKey: 'app-notepad',
        icon: '/images/IconPack/Notepad.png',
        width: 600,
        height: 400,
        windowClass: 'notepad-window',
        content: () => `
            <div class="app-menubar">
                <span class="app-menubar-item" data-i18n="menu-file">${t('menu-file')}</span>
                <span class="app-menubar-item" data-i18n="menu-edit">${t('menu-edit')}</span>
                <span class="app-menubar-item" data-i18n="menu-format">${t('menu-format')}</span>
                <span class="app-menubar-item" data-i18n="menu-view">${t('menu-view')}</span>
                <span class="app-menubar-item" data-i18n="menu-help">${t('menu-help')}</span>
            </div>
            <textarea class="notepad-textarea" spellcheck="false"></textarea>
        `
    },
    'project-info': {
        titleKey: 'app-project-info',
        icon: '/images/IconPack/Notepad.png',
        width: 660,
        height: 500,
        windowClass: 'notepad-window',
        contentKey: 'project-info-text',
        content: () => `
            <div class="app-menubar">
                <span class="app-menubar-item" data-i18n="menu-file">${t('menu-file')}</span>
                <span class="app-menubar-item" data-i18n="menu-edit">${t('menu-edit')}</span>
                <span class="app-menubar-item" data-i18n="menu-format">${t('menu-format')}</span>
                <span class="app-menubar-item" data-i18n="menu-view">${t('menu-view')}</span>
                <span class="app-menubar-item" data-i18n="menu-help">${t('menu-help')}</span>
            </div>
            <textarea class="notepad-textarea" spellcheck="false"></textarea>
        `
    },
    'cv-pl': {
        titleKey: 'app-cv-pl',
        icon: '/images/IconPack/Adobe Reader.png',
        width: 820,
        height: 620,
        windowClass: 'pdf-window',
        content: '<iframe src="/docs/CV_PL.pdf" style="width:100%;height:100%;border:none;display:block;"></iframe>'
    },
    'cv-en': {
        titleKey: 'app-cv-en',
        icon: '/images/IconPack/Adobe Reader.png',
        width: 820,
        height: 620,
        windowClass: 'pdf-window',
        content: '<iframe src="/docs/CV_EN.pdf" style="width:100%;height:100%;border:none;display:block;"></iframe>'
    }
};

// === FOLDER REGISTRY ===
const folders = {
    'my-projects': {
        titleKey: 'folder-my-projects',
        icon: '/images/IconPack/Folder Closed.png',
        items: [
            { name: 'Work Time.exe',            icon: '/images/IconPack/Date and Time.png',                   url: '/work-time/' },
            { name: 'Ekstraklasa Terminal.exe', icon: '/images/IconPack/Command Prompt.png',                  url: '/terminal/' },
            { name: 'Pracownicy.exe',           icon: '/images/IconPack/User Accounts.png',                   url: '/pracownicy/' },
            { name: 'CS Cases.exe',             icon: '/images/IconPack/Minesweeper.png',                     url: '/cscases/' },
            { name: 'Ekstraklasa API.exe',      icon: '/images/IconPack/Internet Information Services 6.png', url: '/api/ekstraklasa/swagger' }
        ]
    }
};

// === WINDOW MANAGEMENT ===
let windowCounter = 0;
let topZIndex = 100;

function iconHtml(src, size) {
    const px = size || 16;
    if (!src) return '';
    return src.startsWith('/')
        ? `<img src="${src}" style="width:${px}px;height:${px}px;vertical-align:middle;flex-shrink:0;" alt="" />`
        : `<span>${src}</span>`;
}

function openWindow(appId) {
    const app = apps[appId];
    if (!app) return;

    windowCounter++;
    const winId  = `win-${windowCounter}`;
    const offset = ((windowCounter - 1) % 10) * 20;
    const title  = t(app.titleKey);
    const contentHtml = typeof app.content === 'function' ? app.content() : app.content;

    const win = document.createElement('div');
    win.className = 'window' + (app.windowClass ? ' ' + app.windowClass : '');
    win.id = winId;
    win.style.top  = (50 + offset) + 'px';
    win.style.left = (50 + offset) + 'px';
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

    // pre-fill notepad textarea from translation key
    if (app.contentKey) {
        const ta = win.querySelector('.notepad-textarea');
        if (ta) ta.value = t(app.contentKey);
    }

    topZIndex++;
    win.style.zIndex = topZIndex;

    const btn = document.createElement('button');
    btn.className = 'taskbar-window-btn';
    btn.textContent = title;
    btn.dataset.windowId = winId;
    btn.dataset.i18n = app.titleKey;
    document.querySelector('.taskbar-windows').appendChild(btn);

    document.getElementById('desktop').appendChild(win);
    setActiveWindow(winId);
}

function openFolder(folderId) {
    const folder = folders[folderId];
    if (!folder) return;

    windowCounter++;
    const winId  = `win-${windowCounter}`;
    const offset = ((windowCounter - 1) % 10) * 20;
    const title  = t(folder.titleKey);

    const itemsHtml = folder.items.map(item => {
        const img = item.icon
            ? `<img src="${item.icon}" style="width:32px;height:32px;" alt="" />`
            : `<div class="icon-missing">✗</div>`;
        return `<div class="explorer-item" data-url="${item.url || ''}">
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

    document.getElementById('desktop').appendChild(win);
    setActiveWindow(winId);

    win.querySelectorAll('.explorer-item').forEach(item => {
        item.addEventListener('dblclick', () => {
            const url = item.dataset.url;
            if (url) window.open(url, '_blank');
        });
    });
}

function bringToFront(win) {
    topZIndex++;
    win.style.zIndex = topZIndex;
    setActiveWindow(win.id);
}

function setActiveWindow(winId) {
    document.querySelectorAll('.taskbar-window-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.windowId === winId);
    });
    document.querySelectorAll('.window').forEach(w => {
        w.classList.toggle('inactive', w.id !== winId);
    });
}

// === CLICK HANDLER ===
document.addEventListener('click', (e) => {
    // close start menu
    const startMenu = document.getElementById('start-menu');
    if (startMenu && !startMenu.classList.contains('hidden')) {
        if (!startMenu.contains(e.target) && !e.target.closest('#start-button')) {
            startMenu.classList.add('hidden');
        }
    }

    // close lang popup
    const langPopup = document.getElementById('lang-popup');
    if (langPopup && !langPopup.classList.contains('hidden')) {
        if (!langPopup.contains(e.target) && !e.target.closest('#lang-btn')) {
            langPopup.classList.add('hidden');
        }
    }

    // window control buttons
    const action = e.target.dataset.action;
    if (action) {
        const win = e.target.closest('.window');
        if (action === 'close') {
            document.querySelector(`[data-window-id="${win.id}"]`)?.remove();
            win.remove();
            setActiveWindow(null);
        } else if (action === 'minimize') {
            win.classList.add('minimized');
            setActiveWindow(null);
        } else if (action === 'maximize') {
            win.classList.toggle('maximized');
        }
        return;
    }

    // taskbar window buttons
    const taskBtn = e.target.closest('.taskbar-window-btn');
    if (taskBtn) {
        const win = document.getElementById(taskBtn.dataset.windowId);
        if (!win) return;
        const isMinimized = win.classList.contains('minimized');
        const isActive    = taskBtn.classList.contains('active');
        if (isMinimized)     { win.classList.remove('minimized'); bringToFront(win); }
        else if (isActive)   { win.classList.add('minimized'); setActiveWindow(null); }
        else                 { bringToFront(win); }
        return;
    }

    // lang popup items
    const langItem = e.target.closest('.lang-popup-item');
    if (langItem) {
        setLang(langItem.dataset.lang);
        document.getElementById('lang-popup').classList.add('hidden');
        return;
    }

    // desktop icon single click = select
    const icon = e.target.closest('.desktop-icon');
    if (icon) {
        document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
        icon.classList.add('selected');
        return;
    }

    // click on empty desktop = deselect all
    if (e.target.closest('#desktop') && !e.target.closest('.window')) {
        document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
    }
});

// === DOUBLE CLICK: open app/folder ===
document.addEventListener('dblclick', (e) => {
    const icon = e.target.closest('.desktop-icon');
    if (!icon) return;
    if (icon.dataset.app)    openWindow(icon.dataset.app);
    else if (icon.dataset.folder) openFolder(icon.dataset.folder);
});

// === START MENU TOGGLE ===
const startBtn = document.getElementById('start-button');
if (startBtn) {
    startBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('start-menu').classList.toggle('hidden');
        document.getElementById('lang-popup').classList.add('hidden');
    });
}

// === LANGUAGE BUTTON ===
const langBtn = document.getElementById('lang-btn');
if (langBtn) {
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const popup = document.getElementById('lang-popup');
        if (popup.classList.contains('hidden')) {
            // position popup above the button
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

// === DRAGGING ===
let dragData = null;

document.addEventListener('mousedown', (e) => {
    const clickedWin = e.target.closest('.window');
    if (clickedWin && !e.target.dataset.action && !clickedWin.classList.contains('minimized')) {
        bringToFront(clickedWin);
    }

    const titlebar = e.target.closest('.window-titlebar');
    if (!titlebar || e.target.dataset.action) return;
    const win = titlebar.closest('.window');
    if (win.classList.contains('maximized')) return;

    dragData = {
        win,
        offsetX: e.clientX - win.offsetLeft,
        offsetY: e.clientY - win.offsetTop
    };
});

document.addEventListener('mousemove', (e) => {
    if (!dragData) return;
    dragData.win.style.left = (e.clientX - dragData.offsetX) + 'px';
    dragData.win.style.top  = (e.clientY - dragData.offsetY) + 'px';
});

document.addEventListener('mouseup', () => { dragData = null; });

// === BOOT SEQUENCE ===
(function runBootSequence() {
    const bootEl    = document.getElementById('boot-screen');
    const welcomeEl = document.getElementById('welcome-screen');
    const desktop   = document.querySelector('.desktop-container');

    if (!bootEl) return;

    setTimeout(() => {
        bootEl.style.display    = 'none';
        welcomeEl.style.display = 'flex';
        welcomeEl.style.opacity = '1';

        setTimeout(() => {
            welcomeEl.style.display = 'none';
            desktop.classList.add('booted');
        }, 3000);
    }, 5000);
}());

// === INIT ===
// apply saved language on load
applyTranslations();
