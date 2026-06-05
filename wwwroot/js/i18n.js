// ============================================================
// i18n.js
// Translations and language-switching helpers.
// No dependencies — load this first.
// ============================================================


// --- Translation table ------------------------------------

// Keys match the data-i18n attributes used in Privacy.cshtml.
const translations = {
    pl: {
        // desktop icons
        'icon-my-computer':   'Mój komputer (o projekcie)',
        'icon-notepad':       'Notatnik',
        'icon-my-projects':   'Moje projekty',
        'icon-cv-pl':         'CV Polskie.pdf',
        'icon-cv-en':         'CV English.pdf',

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

        // welcome screen
        'welcome-text': 'Zapraszamy',

        // app window titles
        'app-my-computer':  'Mój komputer',
        'app-notepad':      'Bez tytułu — Notatnik',
        'app-cv-pl':        'CV Polskie (Polski)',
        'app-cv-en':        'CV Polskie (English)',
        'folder-my-projects': 'Moje projekty',
        'app-health-tracker-readme': 'Health Tracker — README',

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

        // explorer sidebar panels
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

        // "About this project" notepad text
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
• System okien: przeciąganie, min/max, zarządzanie z-indeksem, zmiana rozmiaru
• Menu Start z układem dwukolumnowym
• Pasek zadań z zegarem i przyciskami okien
• Notatnik z paskiem menu
• Eksplorator folderów (styl XP)
• Zmiana języka: Polski / English
• Ikony z oryginalnego pakietu Windows XP
• Przeglądarka PDF - moje CV

--- Projekty ---
Health Tracker       – zapisywanie posiłków i ćwiczeń za pomocą chatu Claude code
Ekstraklasa Terminal – tabela ligowa, symulacja ostatniej kolejki

Autor: Artur Żywczak`,
        
        'project-info-readme': '=== Health Tracker — README ===\n\n(uzupełnij treść...)'
    },

    en: {
        // desktop icons
        'icon-my-computer':   'My Computer (About project)',
        'icon-notepad':       'Notepad',
        'icon-my-projects':   'My Projects',
        'icon-cv-pl':         'CV Polish.pdf',
        'icon-cv-en':         'CV English.pdf',

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

        // welcome screen
        'welcome-text': 'Welcome',

        // app window titles
        'app-my-computer':  'My Computer',
        'app-notepad':      'Untitled — Notepad',
        'app-cv-pl':        'CV — webox (Polish)',
        'app-cv-en':        'CV — webox (English)',
        'folder-my-projects': 'My Projects',
        'app-health-tracker-readme': 'Health Tracker — README',

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

        // explorer sidebar panels
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

        // "About this project" notepad text
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
• Window system: drag, min/max, z-index management, change size
• Start Menu with two-column layout
• Taskbar with live clock and window buttons
• Notepad with menu bar
• Folder Explorer (XP style)
• Language switcher: Polish / English
• Icons from the original Windows XP icon pack
• PDF viewer – my CV

--- Projects ---
Health Tracker       – app for tracking meals and training, used via claude chat
Ekstraklasa Terminal – league table, simulation of the last round

Author: webox`,

        'project-info-readme': '=== Health Tracker — README ===\n\n(fill in content...)'
    }
};


// --- Language state ----------------------------------------

// Persisted in localStorage so the choice survives page reloads
let currentLang = localStorage.getItem('xp-lang') || 'pl';


// --- Helper: translate a key -------------------------------

// Returns the translation for the current language.
// Falls back to Polish if the key is missing in the active language.
function t(key) {
    return translations[currentLang]?.[key] ?? translations.pl?.[key] ?? key;
}


// --- Apply translations to the DOM -------------------------

// Walks every element with a data-i18n attribute and updates its
// textContent to match the current language.
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (key) el.textContent = t(key);
    });

    // Update the language label in the tray (e.g. "PL" / "EN")
    const lbl = document.getElementById('lang-label');
    if (lbl) lbl.textContent = currentLang.toUpperCase();
}


// --- Switch language ---------------------------------------

// Changes the active language, persists the preference, refreshes
// all translated strings, and updates the active marker in the popup.
function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('xp-lang', lang);

    // Mark the chosen item as active in the language popup
    document.querySelectorAll('.lang-popup-item').forEach(el => {
        el.classList.toggle('active', el.dataset.lang === lang);
    });

    applyTranslations();
}
