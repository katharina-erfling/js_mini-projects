'use strict';

{
    const $ = (qs) => document.querySelector(qs);

    const init = () => {
        addExistingProducts();
        $('#add_product').addEventListener('click', addProductFromInput);
    };

    // Fügt alle vorhandenen Produkte aus der PRODUCTS-Liste zur Tabelle hinzu
    const addExistingProducts = () => PRODUCTS.forEach(addProduct);

    // Liest die Eingabefelder aus und fügt das neue Produkt hinzu
    const addProductFromInput = () => {
        addProduct({
            name: $('#new_product .name').value,
            price: $('#new_product .price').value,
        });
    };

    // Erstellt eine neue Tabellenzeile für ein Produkt und hängt sie an tbody an
    const addProduct = (product) => {
        $('#products > tbody').appendChild(
            tr([td(product.name), td(product.price), tdWithActionButtons()])
        );
    };

    // Erstellt die Aktionsspalte mit den drei Buttons (Löschen, Hoch, Runter)
    const tdWithActionButtons = () => {
        const td = document.createElement('td');
        td.appendChild(removeButton());
        td.appendChild(moveUpButton());
        td.appendChild(moveDownButton());
        return td;
    };

    // Button-Factories: erstellen jeweils einen Button mit Symbol, CSS-Klasse und Handler
    const removeButton = () => buildButton('x', 'remove_product', removeProduct);
    const moveUpButton = () => buildButton('↑', 'move_product_up', moveProductUp);
    const moveDownButton = () => buildButton('↓', 'move_product_down', moveProductDown);

    // Entfernt die Zeile des geklickten Buttons aus der Tabelle
    const removeProduct = (e) => productRowForAction(e.currentTarget).remove();

    // Ruft moveProduct mit der jeweiligen Richtungsfunktion auf
    const moveProductUp = (e) => moveProduct(e, up);
    const moveProductDown = (e) => moveProduct(e, down);

    // Ermittelt die aktuelle Zeile und übergibt sie an die Richtungsfunktion
    const moveProduct = (e, direction) => {
        const row = productRowForAction(e.currentTarget);
        direction(row);
    };

    // Verschiebt die Zeile eine Position nach oben (vor den vorherigen Sibling)
    const up = (row) => {
        const prev = row.previousElementSibling;
        if (prev) row.parentNode.insertBefore(row, prev);
    };

    // Verschiebt die Zeile eine Position nach unten (nächsten Sibling vor die aktuelle Zeile)
    const down = (row) => {
        const next = row.nextElementSibling;
        if (next) row.parentNode.insertBefore(next, row);
    };

    // Gibt die nächste tr-Elternelement des geklickten Buttons zurück
    const productRowForAction = (button) => button.closest('tr');

    // Erstellt einen Button mit Text, CSS-Klasse und Click-Handler
    const buildButton = (symbol, cssClass, action) => {
        const button = document.createElement('button');
        button.textContent = symbol;
        button.classList.add(cssClass);
        button.addEventListener('click', action);
        return button;
    };

    // Erstellt eine td-Zelle mit dem übergebenen Text
    const td = (text) => {
        const tdNode = document.createElement('td');
        tdNode.textContent = text;
        return tdNode;
    };

    // Erstellt eine tr-Zeile und hängt alle übergebenen td-Zellen an
    const tr = (tds) => {
        const trNode = document.createElement('tr');
        tds.forEach((td) => trNode.appendChild(td));
        return trNode;
    };

    init();
}