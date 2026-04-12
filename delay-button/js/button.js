      // Leeres Objekt um alle DOM-Elemente zu sammeln
      const DOM = {};

      // Button aus dem HTML holen und im DOM-Objekt speichern
      DOM.button = document.querySelector('.button-send');

      // Klick-Event auf den Button
      DOM.button.addEventListener('click', (e) => {
        const btnEl = e.currentTarget;  // das geklickte Element → der Button
        btnEl.disabled = true;          // Button deaktivieren → kein Doppelklick möglich

        const timer = 3;                         // Countdown startet bei 3 Sekunden
        console.log(btnEl.innerHTML);            // "Send" ausgeben (nur zum Debuggen)
        if (btnEl.disabled) delay(btnEl, timer, btnEl.innerHTML);  // Countdown starten
      });

      const delay = (
        el,              // der Button
        counter = 5,     // Sekunden (Default 5, wir übergeben 3)
        content = 'Send' // ursprünglicher Button-Text (Default "Send")
      ) => {
        // Countdown abgelaufen → Button wieder aktivieren
        if (counter === 0) {
          el.innerHTML = content;       // Text wieder auf "Send" setzen
          return (el.disabled = false); // Button wieder klickbar → fertig!
        }

        // Countdown läuft noch → Text im Button aktualisieren
        el.innerHTML = `available in ${counter} seconds`;

        // 1 Sekunde warten, dann delay nochmal aufrufen mit counter - 1
        setTimeout(() => delay(el, --counter, content), 1000);
      };