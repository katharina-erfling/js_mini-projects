'use strict';

const WINE_GLASS_SIZE = 0.2;
const WINE_ALC_PERCENTAGE = 14;
const BEER_BOTTLE_SIZE = 0.7;
const BEER_ALC_PERCENTAGE = 5;
const STANDARD_DRINK_ALCOHOL_CONTENT = 17;
const ML_PER_LITER = 1000;
const WIDMARK_FACTOR = 0.806;
const WIDMARK_MULTIPLIER = 1.2;
const WIDMARK_DIVISOR = 0.5;
const PROMILLE_FACTOR = 10;

const BAC_LETHAL = 5.0;
const BAC_VERY_DRUNK = 1.0;
const BAC_DRUNK = 0.6;
const BAC_TIPSY = 0.3;
const BAC_SOBER = 0.0;

// Lookup-Tabelle: Schwellenwerte und zugehörige Empfehlungstexte (absteigend sortiert)
const RECOMMENDATIONS = [
  { threshold: BAC_LETHAL, text: 'Sie sind vermutlich tot — oder haben sich vertippt.' },
  { threshold: BAC_VERY_DRUNK, text: 'Wie viele Handys halten Sie in der Hand?' },
  { threshold: BAC_DRUNK, text: 'Fahren Sie nicht, das könnte Sie den Führerschein kosten. Denken Sie auch an die armen Schafe.' },
  { threshold: BAC_TIPSY, text: 'Sie haben vermutlich Konzentrationsschwierigkeiten. Sie sollten nicht mehr fahren.' },
  { threshold: BAC_SOBER, text: 'Sie sind vermutlich noch fahrtüchtig. Diese Angabe ist nicht rechtsverbindlich!' },
];


// -------------------
// Validierung
// -------------------

// Prüft, ob ein Wert eine positive Zahl ist (z. B. 89.5, aber nicht -1 oder 'abc')
const isPositiveNumber = (value) =>
  typeof value === 'number' && value > 0;

// Prüft, ob ein Wert eine positive Ganzzahl ist (z. B. 3, aber nicht 2.5 oder 0)
const isPositiveInteger = (value) =>
  Number.isInteger(value) && value > 0;

// Prüft, ob ein Wert ein String ist
const isString = (value) =>
  typeof value === 'string';

// Prüft, ob ein Wert ein Objekt ist (kein null, kein Array)
const isObject = (value) =>
  typeof value === 'object' && value !== null;

// Gibt einen Fehler zurück, falls das Gewicht keine positive Zahl ist
const validateWeight = (weight) =>
  isPositiveNumber(weight) ? [] : [`${weight} is not a valid weight`];

// Prüft ein einzelnes Getränk-Objekt auf gültigen Typ (String) und gültige Menge (positive Ganzzahl)
const validateDrink = (drink) =>
  isObject(drink)
    ? [
        ...(isString(drink.type) ? [] : [`${drink.type} is not a valid drink type`]),
        ...(isPositiveInteger(drink.amount)
          ? []
          : [`${drink.amount} is not a valid number of bottles or glasses`]),
      ]
    : ['drink is not a valid object'];

// Prüft, ob drinks ein Array ist, und validiert dann jedes einzelne Getränk
const validateDrinks = (drinks) =>
  Array.isArray(drinks)
    ? drinks.flatMap(validateDrink)
    : ['drinks is not a valid array'];

// Validiert den gesamten Datensatz — gibt ein Array aller gefundenen Fehler zurück
const validateRecords = (record) =>
  isObject(record)
    ? [
        ...validateWeight(record.weight),
        ...validateDrinks(record.drinks),
      ]
    : ['record is not a valid object'];


// -------------------
// Berechnung
// -------------------

// Berechnet die Alkoholmenge in Litern für eine Anzahl Weingläser
const calcWineAlcohol = (amount) =>
  amount * WINE_GLASS_SIZE * WINE_ALC_PERCENTAGE / 100;

// Berechnet die Alkoholmenge in Litern für eine Anzahl Bierflaschen
const calcBeerAlcohol = (amount) =>
  amount * BEER_BOTTLE_SIZE * BEER_ALC_PERCENTAGE / 100;

// Wählt anhand des Getränketyps die passende Berechnungsfunktion
const calcAlcohol = (drink) =>
  drink.type === 'wine'
    ? calcWineAlcohol(drink.amount)
    : calcBeerAlcohol(drink.amount);

// Summiert die gesamte Alkoholmenge aller Getränke in Litern
const calcTotalAlcohol = (drinks) =>
  drinks.reduce((sum, drink) => sum + calcAlcohol(drink), 0);

// Rechnet die Alkoholmenge in Liter in Standarddrinks um
const calcStandardDrinks = (drinks) =>
  calcTotalAlcohol(drinks) * ML_PER_LITER / STANDARD_DRINK_ALCOHOL_CONTENT;

// Berechnet den EBAC in % nach der vereinfachten Widmark-Formel
const calcEbac = (weight, drinks) =>
  (WIDMARK_FACTOR * calcStandardDrinks(drinks) * WIDMARK_MULTIPLIER) /
  (WIDMARK_DIVISOR * weight);

// Gibt den Blutalkoholgehalt in Promille zurück (EBAC % * 10)
const bloodAlcoholContentFor = (record) =>
  calcEbac(record.weight, record.drinks) * PROMILLE_FACTOR;


// -------------------
// Empfehlung
// -------------------

// Sucht den ersten Eintrag in RECOMMENDATIONS, dessen Schwellenwert unterschritten wird
const getRecommendation = (bac) =>
  RECOMMENDATIONS.find((entry) => bac >= entry.threshold).text;


// -------------------
// Ausgabe
// -------------------

// Validiert den Datensatz, gibt Fehler aus oder berechnet und zeigt den Blutalkoholgehalt
const printReport = (record) => {
  const errors = validateRecords(record);
  if (errors.length > 0) {
    errors.forEach((error) => console.log(error));
    return;
  }
  const bac = bloodAlcoholContentFor(record);
  console.log(
    `Blutalkoholgehalt: ${bac.toFixed(2)} Promille\n${getRecommendation(bac)}`
  );
};


// -------------------
// Tests
// -------------------
const validRecord = {
  weight: 89.5,
  drinks: [
    { type: 'wine', amount: 5 },
    { type: 'beer', amount: 3 },
    { type: 'wine', amount: 2 },
  ],
};

const invalidRecord = {
  weight: 'sixty',
  drinks: [
    { type: 'wine', amount: 2.5 },
    { type: 'beer', amount: 3 },
  ],
};

printReport(validRecord);
printReport(invalidRecord);