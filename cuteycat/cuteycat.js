'use strict';

const $ = (qs) => document.querySelector(qs);
const $$ = (qs) => Array.from(document.querySelectorAll(qs));

{
    const init = () => {

        // Alle Kandidaten-Einträge aus der Liste holen
        const candidates = $$('#candidates li');

        candidates.forEach((cats) => {
            cats.addEventListener('click', () => {

                // Namen aller bereits gewählten Katzen sammeln
                const cutestNames = $$('#cutest span').map(span => span.textContent);

                // Namen der angeklickten Katze auslesen
                const catName = cats.querySelector('span').textContent;

                // Abbruch: Katze ist bereits in der Auswahl
                if (cutestNames.includes(catName)) return;

                // Abbruch: Maximal 3 Katzen erlaubt
                if ($$('#cutest span').length >= 3) return;

                // Eintrag klonen und in die Auswahl einfügen
                const clone = cats.cloneNode(true);

                // Klick auf geklonten Eintrag entfernt ihn wieder
                clone.addEventListener('click', () => clone.remove());

                $('#cutest').appendChild(clone);
            });
        });
    };

    init();
}