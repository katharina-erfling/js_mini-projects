'use strict';


/* //////////////////// */
///    Konstanten     ///
/* //////////////////// */

// Referenz auf das HTML-Element mit der ID 'content' holen
const contentElement = document.getElementById('content');

// Den ursprünglichen Text des Elements speichern (als Backup)
const originalText = contentElement.textContent;


/* //////////////////// */
///    Variablen      ///
/* //////////////////// */

// Arbeitskopie des Textes – wird bei Ersetzungen verändert
let currentText = originalText;


/* //////////////////// */
///    Funktionen     ///
/* //////////////////// */

// Escaped Sonderzeichen im Suchbegriff für sichere Verwendung in RegExp
const escapeRegExp = (string) =>
  string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Hebt alle Vorkommen des Suchbegriffs im Inhalt gelb hervor.
 * @param {string} searchTerm - Der zu suchende Begriff
 */
const search = (searchTerm) => {
  // Leere oder nur Leerzeichen enthaltende Eingaben ignorieren
  if (!searchTerm.trim()) {
    contentElement.textContent = currentText;
    return;
  }

  // Alle Vorkommen (case-insensitiv) mit einem gelben <span> umschließen
  contentElement.innerHTML = currentText.replace(
    new RegExp(escapeRegExp(searchTerm), 'gi'),
    `<span style="background-color: yellow">${searchTerm}</span>`
  );
};

/**
 * Ersetzt Vorkommen des Suchbegriffs durch den Ersetzungsbegriff.
 * @param {string} searchTerm      - Der zu ersetzende Begriff
 * @param {string} replaceTerm     - Der neue Begriff
 * @param {boolean} shouldReplaceAll - true = alle ersetzen, false = nur erstes Vorkommen
 */
const replaceText = (searchTerm, replaceTerm, shouldReplaceAll) => {
  // Leere oder nur Leerzeichen enthaltende Eingaben ignorieren
  if (!searchTerm.trim()) return;

  // Flag bestimmen: 'gi' = global + case-insensitiv, 'i' = nur erstes + case-insensitiv
  const flag = shouldReplaceAll ? 'gi' : 'i';

  // Arbeitskopie des Textes aktualisieren
  currentText = currentText.replace(new RegExp(escapeRegExp(searchTerm), flag), replaceTerm);

  // Aktualisierten Text im DOM anzeigen
  contentElement.innerHTML = currentText;
};


/* //////////////////// */
///   Event-Listener  ///
/* //////////////////// */

const init = () => {
  // Live-Suche: Hebt Treffer hervor, sobald der Nutzer im Suchfeld tippt
  document.getElementById('search').addEventListener('input', () => {
    const value = document.getElementById('search').value;
    search(value);
  });

  // Button: Ersetzt nur das erste Vorkommen und hebt verbleibende Treffer weiterhin hervor
  document.getElementById('replaceFirstOccurencebtn').addEventListener('click', () => {
    const searchValue = document.getElementById('search').value;
    const replaceValue = document.getElementById('replace').value;
    replaceText(searchValue, replaceValue, false);
    search(searchValue); // Hervorhebung nach Ersetzung aktualisieren
  });

  // Button: Ersetzt alle Vorkommen auf einmal
  document.getElementById('replaceAllbtn').addEventListener('click', () => {
    const searchValue = document.getElementById('search').value;
    const replaceValue = document.getElementById('replace').value;
    replaceText(searchValue, replaceValue, true);
  });
};


init();