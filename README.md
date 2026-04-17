# 🧱 JS Mini Projects
Eine Sammlung kleiner aber vollständiger JavaScript-Mini-Projekte – entstanden beim Lernen im Rahmen der Frontend Developer Zertifizierung JavaScript.

🚧 Work in Progress  
Dieses Repo wächst mit – neue Mini-Projekte kommen regelmäßig dazu.

---

## 📁 Projektstruktur
```
/
├── delay-button/
│   ├── js/
│   │   └── button.js
│   └── button.html
├── profile-cards/
│   ├── js/
│   │   └── profile-cards.js
│   └── profilecards.html
├── chat/
│   ├── style/
│   │   └── style.css
│   ├── chat.html
│   └── chat.js
├── newsboard/
│   ├── newsboard.html
│   ├── newsboard.js
│   └── newsboard.css
└── product-management/
    ├── index.html
    ├── products.css
    ├── product_list.js
    └── product_manager.js
```

---

## 🧩 Projekte

### 👤 Profile Cards

> 💡 **Destructuring mit Defaults im Parameter** – fehlende Eigenschaften werden direkt beim Funktionsaufruf mit Platzhalterwerten aufgefangen, kein separates Fallback nötig

- Dynamische Profilkarten per DOM-Manipulation – HTML wird per JavaScript generiert und ins DOM geschrieben
- Objekt-Destructuring mit Default-Werten direkt im Funktionsparameter
- Konditionelles Rendering – Alter und Hobbies werden nur angezeigt wenn vorhanden
- `map().join('')` zum Aufbauen der Hobby-Liste als HTML-String
- Bootstrap 5 für das Card-Layout

<br>

### ⏱️ Delay Button

> 🔁 **Rekursiver Countdown** – statt `setInterval` wird `delay()` per `setTimeout` immer wieder mit `counter - 1` aufgerufen – sauber, selbstlimitierend und ohne manuelle Cleanup-Logik

> 🗂️ **DOM-Objekt Pattern** – alle DOM-Elemente werden in einem einzigen `DOM`-Objekt gesammelt statt in einzelnen Variablen – wartbarer und besser skalierbar

- Button deaktiviert sich nach Klick und zeigt einen Countdown an
- Rekursiver `setTimeout`-Ansatz für den Countdown
- Button-Text wird dynamisch aktualisiert und nach Ablauf zurückgesetzt
- Doppelklick-Schutz per `disabled`
- Bootstrap 5 für das Layout

<br>

### 💬 Chat

> 🔒 **Block-Scoping mit `{}`** – der gesamte Code ist in einem Block gekapselt, keine globalen Variablen

> 🔍 **Live-Suche per `keyup`** – Mitglieder werden bei jeder Tasteneingabe gefiltert und per `classList` hervorgehoben

- Live-Suche in der Mitgliederliste – Treffer werden per CSS-Klasse highlighted
- `$$()` als Kurzschreibweise für `querySelectorAll()` mit `Array.from()`
- `filter()` + `forEach()` für das Highlighting
- Admin-Mitglied per CSS-Klasse und `::after`-Pseudo-Element hervorgehoben
- CSS Grid Layout für Chat-Fenster und Seitenleiste

<br>

### 📰 Newsboard

> ⌨️ **Tastaturnavigation** – Pfeiltasten zum Blättern, `Alt` + Pfeiltaste zur ersten/letzten Nachricht

> 🔢 **Dynamisches Badge** – `message_number` wird aus `messages.length` gelesen statt hardcoded

> 📊 **Fortschrittsbalken** – `<progress>`-Element wird synchron mit der aktuellen Nachrichtennummer aktualisiert – `max` und `value` werden dynamisch gesetzt

> 🔘 **disabled-State für Navigation** – Vor/Zurück-Buttons deaktivieren sich automatisch an erster und letzter Nachricht

> 🎯 **`progressbar()` als Getter** – statt direktem DOM-Zugriff wird das Element über eine Funktion abgerufen – sauber und wiederverwendbar

- Nachrichten-Viewer mit Vor/Zurück Navigation per Klick und Tastatur
- `init()` als Einstiegspunkt – registriert alle Event Listener
- Block-Scoping mit `{}` – keine globalen Variablen
- Nachrichten als HTML-Strings in einem Array gespeichert
- Navigation auf semantische `<button>`-Elemente umgestellt

<br>

### 🗂️ Product Management

> 🏭 **Button-Factory Pattern** – `buildButton()` erstellt alle Aktions-Buttons (Löschen, Hoch, Runter) mit Symbol, CSS-Klasse und Handler in einem Aufruf – keine Wiederholung

> 🎯 **`closest('tr')`** – der geklickte Button findet seine eigene Tabellenzeile selbst, kein Index-Tracking nötig

> ↕️ **DOM-basiertes Sortieren** – Zeilen werden per `insertBefore()` verschoben statt das Array neu zu rendern

- Produktliste aus separater Datei (`product_list.js`) wird beim Laden in die Tabelle gerendert
- Neue Produkte per Eingabefeld hinzufügen
- Zeilen löschen, nach oben und nach unten verschieben
- DOM-Elemente (`tr`, `td`) werden per `createElement` aufgebaut
- Zwei JS-Dateien: Daten (`product_list.js`) und Logik (`product_manager.js`) getrennt

---

## 🛠️ Technologien
- **HTML5** – semantisches Markup, `<progress>`-Element, `<button>` für Navigation
- **JavaScript (ES6+)** – Destructuring, Default-Parameter, DOM-Manipulation, `setTimeout`, Rekursion, Arrow Functions, `map()`, `join()`, `filter()`, `forEach()`, `classList`, Block-Scoping, Event Listener, Tastaturevents, `disabled`, `createElement`, `appendChild`, `insertBefore`, `closest()`
- **CSS3** – CSS Grid, `::after`, `classList`-basiertes Highlighting, `progress`-Styling
- **Bootstrap 5** – Card-Layout, Button-Styling (Profile Cards & Delay Button)

---

## 📚 Kontext
Teil der **Softwareentwicklerin Frontend Javascript Zertifizierung** bei GFN (extern zertifiziert durch WPI), März – Juni 2026.
