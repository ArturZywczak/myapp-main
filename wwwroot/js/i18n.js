// ============================================================
// i18n.js
// Translations and language-switching helpers.
// No dependencies - load this first.
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
        'icon-github': 'Mój profil GitHub.exe',
        'icon-linkedin': 'Mój profil LinkedIn.exe',

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

        // title buttons
        'btn-newtab': 'Otwórz w nowej karcie',

        // app window titles
        'app-my-computer':  'Mój komputer',
        'app-notepad':      'Bez tytułu - Notatnik',
        'app-cv-pl':        'CV Polskie (Polski)',
        'app-cv-en':        'CV Polskie (English)',
        'folder-my-projects': 'Moje projekty',
        'app-health-tracker-readme': 'Health Tracker - README',
        'app-github': 'Mój profil GitHub',
        'app-linkedin': 'Mój profil LinkedIn',
        'app-outlook-express': 'Nowa wiadomość',
        'icon-outlook-express': 'Outlook Express - skontaktuj się ze mną',

        // outlook express
        'oe-to':          'Do:',
        'oe-from':        'Od:',
        'oe-subject':     'Temat:',
        'oe-btn-send':    'Wyślij',
        'oe-btn-cut':     'Wytnij',
        'oe-btn-copy':    'Kopiuj',
        'oe-btn-paste':   'Wklej',
        'oe-btn-undo':    'Cofnij',
        'oe-sending':     'Wysyłanie...',
        'oe-sent':        'Wiadomość wysłana.',
        'oe-error-empty': 'Wypełnij wszystkie pola.',
        'oe-error-send':  'Błąd wysyłania. Spróbuj ponownie.',

        // app menu bar
        'menu-file':      'Plik',
        'menu-edit':      'Edycja',
        'menu-format':    'Format',
        'menu-view':      'Widok',
        'menu-help':      'Pomoc',
        'menu-favorites': 'Ulubione',
        'menu-tools':     'Narzędzia',
        'menu-insert':    'Wstaw',
        'menu-message':   'Wiadomość',

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

Interaktywna strona portfolio symulująca klasyczny
interfejs Windows XP, zbudowana w ASP.NET Core 8.0.
Serwer: własny komputer domowy, Polska.

--- Technologie ---
Backend  : ASP.NET Core 8.0 (C#)
Frontend : HTML / CSS / JavaScript (vanilla)
Motyw    : Windows XP – klasyczny Luna
Deploy   : Docker, nginx, własny serwer

--- Funkcje ---
• Animowana sekwencja startowa (boot + ekran powitalny)
• System okien: przeciąganie, min/max, resize, z-index
• Menu Start z układem dwukolumnowym
• Pasek zadań z zegarem i przyciskami okien
• Notatnik, Eksplorator folderów (styl XP)
• Okno "Outlook Express" – formularz kontaktowy
• Przycisk "Otwórz w nowej karcie" w titlebarze
• Zmiana języka: Polski / English
• Przeglądarka PDF – moje CV

--- Projekty ---
Health Tracker       – śledzenie posiłków i ćwiczeń
Ekstraklasa Terminal – tabela ligowa PKO BP Ekstraklasy

Autor: Artur Żywczak
Kontakt: kontakt@rudex.click`,
        
        'project-info-readme': '=== Health Tracker - README ===\n\n(uzupełnij treść...)',

        // shutdown battery tray
        'battery-remaining':     'Pozostało:',
        'battery-info':          'Serwer wyłącza się automatycznie gdy jest nieużywany — oszczędza energię i zmniejsza hałas. Powyżej widzisz czas do wyłączenia.',
        'battery-extend':        'Doładuj baterię',
        'battery-off':           'Wyłączanie…',
        'balloon-initial-title': 'Serwer wyłączy się za 15 minut',
        'balloon-initial-body':  'Gdy zostanie mniej niż 10 minut, przycisk Doładuj baterię stanie się aktywny — zresetuje odliczanie do 15 min.',
        'balloon-low-title':     'Bateria niska',
        'balloon-low-body':      'Serwer wyłączy się za kilka minut. Kliknij ikonę baterii i użyj przycisku Doładuj baterię.',
        'balloon-dead-title':    'Uwaga — wyłączenie za minutę!',
        'balloon-dead-body':     'Serwer zaraz się wyłączy.',
        'balloon-dead-hint':     'Aby uruchomić ponownie, odwiedź stronę główną na Pi.',
    },

    en: {
        // desktop icons
        'icon-my-computer':   'My Computer (About project)',
        'icon-notepad':       'Notepad',
        'icon-my-projects':   'My Projects',
        'icon-cv-pl':         'CV Polish.pdf',
        'icon-cv-en': 'CV English.pdf',
        'icon-github': 'My Github Profile.exe',
        'icon-linkedin': 'My LinkedIn Profile.exe',

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

        // title buttons
        'btn-newtab': ' Open in new tab',

        // app window titles
        'app-my-computer':  'My Computer',
        'app-notepad':      'Untitled - Notepad',
        'app-cv-pl':        'CV - webox (Polish)',
        'app-cv-en':        'CV - webox (English)',
        'folder-my-projects': 'My Projects',
        'app-health-tracker-readme': 'Health Tracker - README',
        'app-github': 'My GitHub Profile',
        'app-linkedin': 'My LinkedIn Profile',
        'app-outlook-express': 'New Message',
        'icon-outlook-express': 'Outlook Express - contact me',

        // outlook express
        'oe-to':          'To:',
        'oe-from':        'From:',
        'oe-subject':     'Subject:',
        'oe-btn-send':    'Send',
        'oe-btn-cut':     'Cut',
        'oe-btn-copy':    'Copy',
        'oe-btn-paste':   'Paste',
        'oe-btn-undo':    'Undo',
        'oe-sending':     'Sending...',
        'oe-sent':        'Message sent.',
        'oe-error-empty': 'Please fill in all fields.',
        'oe-error-send':  'Send failed. Please try again.',

        // app menu bar
        'menu-file':      'File',
        'menu-edit':      'Edit',
        'menu-format':    'Format',
        'menu-view':      'View',
        'menu-help':      'Help',
        'menu-favorites': 'Favorites',
        'menu-tools':     'Tools',
        'menu-insert':    'Insert',
        'menu-message':   'Message',

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

An interactive portfolio website simulating the classic
Windows XP interface, built with ASP.NET Core 8.0.
Server: personal home computer, Poland.

--- Technologies ---
Backend  : ASP.NET Core 8.0 (C#)
Frontend : HTML / CSS / JavaScript (vanilla)
Theme    : Windows XP – classic Luna
Deploy   : Docker, nginx, self-hosted

--- Features ---
• Animated startup sequence (boot + welcome screen)
• Window system: drag, min/max, resize, z-index
• Start Menu with two-column layout
• Taskbar with live clock and window buttons
• Notepad, Folder Explorer (XP style)
• Outlook Express window – contact form
• "Open in new tab" button in title bar
• Language switcher: Polish / English
• PDF viewer – my CV

--- Projects ---
Health Tracker       – meal and workout tracker
Ekstraklasa Terminal – PKO BP Ekstraklasa league table

Author: Artur Żywczak
Contact: kontakt@rudex.click`,

        'project-info-readme': '=== Health Tracker - README ===\n\n(fill in content...)',

        // shutdown battery tray
        'battery-remaining':     'Remaining:',
        'battery-info':          'The server shuts down automatically when idle — saving power and reducing noise. The timer above shows how long until shutdown.',
        'battery-extend':        'Recharge battery',
        'battery-off':           'Shutting down…',
        'balloon-initial-title': 'Server will shut down in 15 minutes',
        'balloon-initial-body':  'When less than 10 minutes remain, the Recharge battery button becomes available — it resets the countdown to 15 min.',
        'balloon-low-title':     'Low battery',
        'balloon-low-body':      'Server shuts down in a few minutes. Click the battery icon and use the Recharge battery button.',
        'balloon-dead-title':    'Warning — shutdown in 1 minute!',
        'balloon-dead-body':     'The server is about to shut down.',
        'balloon-dead-hint':     'To restart, visit the home page on the Pi.',
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
