// ============================================================
// registry.js
// App and folder registry — defines what each window looks
// like and what it contains.
// Depends on: i18n.js  (t() is called inside content functions)
// ============================================================


// --- App registry -----------------------------------------

// Each key matches the data-app attribute on a desktop icon or
// start-menu item.  Properties:
//   titleKey   — i18n key for the window title
//   icon       — path to the 16-px icon shown in the titlebar
//   width/height — initial window size in pixels
//   windowClass  — optional extra CSS class on the window element
//   content    — HTML string or function returning HTML
//   contentKey — i18n key whose value is pre-filled into a notepad textarea
const apps = {

    'my-computer': {
        titleKey: 'app-my-computer',
        icon: '/images/IconPack/My Computer.webp',
        width: 500,
        height: 350,
        content: () => `<pre style="padding:12px;margin:0;font-family:inherit;font-size:12px;white-space:pre-wrap;">${t('project-info-text')}</pre>`
    },

    'notepad': {
        titleKey: 'app-notepad',
        icon: '/images/IconPack/Notepad.webp',
        width: 600,
        height: 400,
        windowClass: 'notepad-window',
        // content is a function so t() is called at open-time,
        // picking up the current language
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

    'notepad-whyslow': {
        titleKey: 'app-notepad-whyslow',
        icon: '/images/IconPack/Notepad.webp',
        width: 600,
        height: 400,
        windowClass: 'notepad-window',
        // content is a function so t() is called at open-time,
        // picking up the current language
        content: () => `
            <div class="app-menubar">
                <span class="app-menubar-item" data-i18n="menu-file">${t('menu-file')}</span>
                <span class="app-menubar-item" data-i18n="menu-edit">${t('menu-edit')}</span>
                <span class="app-menubar-item" data-i18n="menu-format">${t('menu-format')}</span>
                <span class="app-menubar-item" data-i18n="menu-view">${t('menu-view')}</span>
                <span class="app-menubar-item" data-i18n="menu-help">${t('menu-help')}</span>
            </div>
            <textarea class="notepad-textarea" spellcheck="false">${t('notepad-whyslow-text')}</textarea>
        `
    },

    // CV files open in an iframe so the browser renders the PDF inline
    'cv-pl': {
        titleKey: 'app-cv-pl',
        icon: '/images/IconPack/Adobe Reader.webp',
        url: '/docs/CV_PL.pdf',
        width: 820,
        height: 620,
        windowClass: 'pdf-window',
        content: '<iframe src="/docs/CV_PL.pdf" style="width:100%;height:100%;border:none;display:block;"></iframe>'
    },

    'cv-en': {
        titleKey: 'app-cv-en',
        icon: '/images/IconPack/Adobe Reader.webp',
        url: '/docs/CV_EN.pdf',
        width: 820,
        height: 620,
        windowClass: 'pdf-window',
        content: '<iframe src="/docs/CV_EN.pdf" style="width:100%;height:100%;border:none;display:block;"></iframe>'
    },

    'github-link': {
        titleKey: 'app-github',
        icon: '/images/IconPack/github.svg',
        url: 'https://github.com/ArturZywczak',
        width: 820,
        height: 620,
        windowClass: 'pdf-window',
        content: '<iframe src="https://github.com/ArturZywczak" style="width:100%;height:100%;border:none;display:block;"></iframe>'
    },

    'linkedin-link': {
        titleKey: 'app-linkedin',
        icon: '/images/IconPack/linkedin.png',
        url: 'http://www.linkedin.com/in/artur-żywczak-ab27b7413',
        width: 820,
        height: 620,
        windowClass: 'pdf-window',
        content: '<iframe src="http://www.linkedin.com/in/artur-żywczak-ab27b7413" style="width:100%;height:100%;border:none;display:block;"></iframe>'
    },

    // Health Tracker README — opened from the Moje projekty explorer
    'health-readme': {
        titleKey: 'app-health-tracker-readme',
        icon: '/images/IconPack/Notepad.webp',
        width: 660,
        height: 500,
        windowClass: 'notepad-window',
        contentKey: 'project-info-readme',
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
    }
};


// --- Folder registry --------------------------------------

// Each key matches the data-folder attribute on a desktop icon.
// items[] lists the files shown inside the explorer window;
// double-clicking an item calls openProjectWindow() with the item data.
const folders = {

    'my-projects': {
        titleKey: 'folder-my-projects',
        icon: '/images/IconPack/Folder Closed.webp',
        items: [
            {
                name: 'Health Tracker.exe',
                icon: '/images/IconPack/Internet Hearts.webp',
                url:  '/health/'
            },
            {
                name: 'Health Tracker README.txt',
                icon: '/images/IconPack/Notepad.webp',
                app:  'health-readme'   // opens the registered app, not an iframe
            },
            {
                name: 'Ekstraklasa Terminal.exe',
                icon: '/images/IconPack/Command Prompt.webp',
                url:  '/terminal/'
            }
/*            {
                name: 'Pracownicy.exe',
                icon: '/images/IconPack/User Accounts.webp',
                url:  '/pracownicy/'
            },
            {
                name: 'CS Cases.exe',
                icon: '/images/IconPack/Minesweeper.webp',
                url:  '/cscases/'
            },
            {
                name: 'Ekstraklasa API.exe',
                icon: '/images/IconPack/Internet Information Services 6.webp',
                url:  '/api/ekstraklasa/swagger'
            }*/
        ]
    }
};
