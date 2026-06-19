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

--- Projekty ---
Health Tracker       – śledzenie posiłków i ćwiczeń
Ekstraklasa Terminal – tabela ligowa PKO BP Ekstraklasy

Autor: Artur Żywczak
Kontakt: kontakt@rudex.click`,
        
        'project-info-readme': `================================================================================
  HEALTH TRACKER
================================================================================
  Aplikacja do śledzenia diety, aktywności fizycznej i postępów zdrowotnych.
  Dostępna pod adresem: https://main.rudex.click/health/
--------------------------------------------------------------------------------
  TECHNOLOGIE
--------------------------------------------------------------------------------
  Backend
    - Node.js + Express 4
    - MariaDB 11 (baza danych)
    - Google Drive API (synchronizacja danych z Claude.ai)
    - OpenFoodFacts API (wyszukiwanie produktów po kodzie kreskowym)
  Frontend
    - React 18
    - Vite 5 (bundler)
    - Tailwind CSS (stylowanie)
  Infrastruktura
    - Docker + Docker Compose (kontenery)
    - nginx (reverse proxy)
    - Cloudflare Tunnel (publiczny dostęp HTTPS)
    - Automatyczny deploy z GitHub co 5 minut
--------------------------------------------------------------------------------
  JAK DZIAŁA
--------------------------------------------------------------------------------
  Aplikacja składa się z trzech kontenerów Docker:
    health-api       Port 3100   REST API (Node.js)
    health-frontend  Port 3101   Interfejs (React, serwowany przez nginx)
    mariadb-health   Port 3306   Baza danych (tylko sieć wewnętrzna Docker)
  Żaden port nie jest eksponowany bezpośrednio na zewnątrz. Ruch trafia przez
  główny nginx działający jako reverse proxy:
    /health/         →  health-frontend
    /health-api/     →  health-api
  Każde żądanie do API wymaga nagłówka X-API-Key. Frontend pobiera klucz
  ze zmiennych środowiskowych podczas budowania (Vite).
  Schemat bazy danych:
    users        Profil użytkownika (wiek, wzrost, płeć, poziom aktywności)
    goals        Cele kaloryczne i makroskładnikowe (z datą ważności)
    daily_logs   Dzienna waga i liczba kroków
    meals        Posiłki (kcal, białko, tłuszcze, węglowodany)
    activities   Aktywności fizyczne (czas trwania, spalone kcal)
--------------------------------------------------------------------------------
  FUNKCJE
--------------------------------------------------------------------------------
  Dziś
    Dzienne podsumowanie kalorii i makroskładników. Pierścień kalorii pokazuje
    postęp względem celu. Lista posiłków i aktywności z możliwością dodawania,
    edycji i usuwania. Rejestracja wagi i kroków.
  Wykresy
    Wykresy historyczne: waga, kalorie, makroskładniki, aktywność.
  Historia
    Przeglądanie wpisów z wybranego zakresu dat. Widok paginowany (10 dni
    na stronę). Każdy dzień rozwijany po kliknięciu — szczegóły posiłków
    i aktywności.
  Profil
    Dane użytkownika i aktualny cel kaloryczny.
  Skanowanie kodów kreskowych
    Wyszukiwanie wartości odżywczych produktów przez OpenFoodFacts API.
  Google Drive Sync
    Claude.ai może zapisywać dane do pliku pending.json w Google Drive.
    API odbiera je co 10 minut i wpisuje do bazy danych.
--------------------------------------------------------------------------------
  DOSTĘP
--------------------------------------------------------------------------------
  Demo (użytkownik publiczny):
    https://main.rudex.click/health/
  Widok właściciela (pełne dane):
    https://main.rudex.click/health/?key=<token>
================================================================================
`,

        // shutdown battery tray
        'battery-remaining':     'Pozostało:',
        'battery-info':          'Serwer wyłącza się automatycznie gdy jest nieużywany - oszczędza energię i zmniejsza hałas. Powyżej widzisz czas do wyłączenia.',
        'battery-extend':        'Doładuj baterię',
        'battery-off':           'Wyłączanie…',
        'balloon-initial-title': 'Serwer wyłączy się za 15 minut',
        'balloon-initial-body':  'Gdy zostanie mniej niż 10 minut, przycisk Doładuj baterię stanie się aktywny - zresetuje odliczanie do 15 min.',
        'balloon-low-title':     'Bateria niska',
        'balloon-low-body':      'Serwer wyłączy się za kilka minut. Kliknij ikonę baterii i użyj przycisku Doładuj baterię.',
        'balloon-dead-title':    'Uwaga - wyłączenie za minutę!',
        'balloon-dead-body':     'Serwer zaraz się wyłączy.',
        'balloon-dead-hint':     'Aby uruchomić ponownie, odwiedź stronę główną na Pi.',
        'battery-ssh-remaining': '∞ (SSH aktywne)',
        'battery-ssh-info':      'Aktywna sesja SSH — automatyczne wyłączanie wstrzymane.',
        'balloon-ssh-title':     'Automatyczne wyłączanie wyłączone',
        'balloon-ssh-body':      'Wykryto aktywne połączenie SSH. Serwer nie wyłączy się automatycznie.',
        'shutdown-text':         'trwa wyłączanie...',
    },

    en: {
        // desktop icons
        'icon-my-computer':   'My Computer (About project)',
        'icon-notepad':       'Notepad',
        'icon-my-projects':   'My Projects',
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

--- Projects ---
Health Tracker       – meal and workout tracker
Ekstraklasa Terminal – PKO BP Ekstraklasa league table

Author: Artur Żywczak
Contact: kontakt@rudex.click`,

        'project-info-readme': `================================================================================
  HEALTH TRACKER
================================================================================
  An application for tracking diet, physical activity, and health progress.
  Available at: https://main.rudex.click/health/
--------------------------------------------------------------------------------
  TECHNOLOGIES
--------------------------------------------------------------------------------
  Backend
    - Node.js + Express 4
    - MariaDB 11 (database)
    - Google Drive API (data synchronization with Claude.ai)
    - OpenFoodFacts API (product lookup by barcode)
  Frontend
    - React 18
    - Vite 5 (bundler)
    - Tailwind CSS (styling)
  Infrastructure
    - Docker + Docker Compose (containers)
    - nginx (reverse proxy)
    - Cloudflare Tunnel (public HTTPS access)
    - Automatic deploy from GitHub every 5 minutes
--------------------------------------------------------------------------------
  HOW IT WORKS
--------------------------------------------------------------------------------
  The application consists of three Docker containers:
    health-api       Port 3100   REST API (Node.js)
    health-frontend  Port 3101   User interface (React, served by nginx)
    mariadb-health   Port 3306   Database (internal Docker network only)
  No ports are exposed directly to the outside. Traffic is routed through
  a main nginx instance acting as a reverse proxy:
    /health/         →  health-frontend
    /health-api/     →  health-api
  Every API request requires an X-API-Key header. The frontend receives the
  key from environment variables at build time (Vite).
  Database schema:
    users        User profile (age, height, sex, activity level)
    goals        Calorie and macro targets (with effective date)
    daily_logs   Daily weight and step count
    meals        Meals (kcal, protein, fat, carbohydrates)
    activities   Physical activities (duration, calories burned)
--------------------------------------------------------------------------------
  FEATURES
--------------------------------------------------------------------------------
  Today
    Daily summary of calories and macronutrients. A calorie ring shows progress
    toward the daily goal. List of meals and activities with add, edit, and
    delete support. Weight and step logging.
  Charts
    Historical charts: weight, calories, macros, and activity.
  History
    Browse entries for a selected date range. Paginated view (10 days per
    page). Each day expands on click to show meal and activity details.
  Profile
    User data and current calorie goal.
  Barcode scanning
    Product nutritional lookup via the OpenFoodFacts API.
  Google Drive Sync
    Claude.ai can write data to a pending.json file in Google Drive.
    The API picks it up every 10 minutes and saves it to the database.
--------------------------------------------------------------------------------
  ACCESS
--------------------------------------------------------------------------------
  Demo (public user):
    https://main.rudex.click/health/
  Owner view (full data):
    https://main.rudex.click/health/?key=<token>
================================================================================`,

        // shutdown battery tray
        'battery-remaining':     'Remaining:',
        'battery-info':          'The server shuts down automatically when idle - saving power and reducing noise. The timer above shows how long until shutdown.',
        'battery-extend':        'Recharge battery',
        'battery-off':           'Shutting down…',
        'balloon-initial-title': 'Server will shut down in 15 minutes',
        'balloon-initial-body':  'When less than 10 minutes remain, the Recharge battery button becomes available - it resets the countdown to 15 min.',
        'balloon-low-title':     'Low battery',
        'balloon-low-body':      'Server shuts down in a few minutes. Click the battery icon and use the Recharge battery button.',
        'balloon-dead-title':    'Warning - shutdown in 1 minute!',
        'balloon-dead-body':     'The server is about to shut down.',
        'balloon-dead-hint':     'To restart, visit the home page on the Pi.',
        'battery-ssh-remaining': '∞ (SSH active)',
        'battery-ssh-info':      'Active SSH session — automatic shutdown is paused.',
        'balloon-ssh-title':     'Automatic shutdown paused',
        'balloon-ssh-body':      'An active SSH connection was detected. The server will not shut down automatically.',
        'shutdown-text':         'is shutting down...',
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
