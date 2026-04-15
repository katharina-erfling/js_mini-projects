'use strict';

{
  // Einstiegspunkt — registriert alle Events
  const init = () => {
    // Beobachte das Suchfeld — sobald eine Taste losgelassen wird, schau was drin steht
    // und übergib es an updateHighlightingOfChatMember
  $('#member_search input').addEventListener('keyup', (event) => {
    updateHighlightingOfChatMembers(event.target.value);
  });
};

  // koordiniert — entfernt alle Highlights und hebt passende hervor
  const updateHighlightingOfChatMembers = (partOfMemberName) => {
    removeHighlightsFromAllChatMembers();
    highlightChatMembersBy(partOfMemberName);
  };

  // entfernt alle Highlights
  const removeHighlightsFromAllChatMembers = () => {
    chatMembers().forEach(removeHighlight);
  };

  // Hole alle Mitglieder, behalte nur die, die passen und hebe sie hervor
  const highlightChatMembersBy = (partOfMemberName) => {
    if (partOfMemberName === '') return; // Guard Clause — leerer String wird ignoriert
    chatMembers()
      .filter((member) => doesMemberMatch(partOfMemberName, member))
      .forEach(highlight);
  };

  // prüfen ob Name passt
  const doesMemberMatch = (partOfMemberName, member) =>
    member.innerHTML.toLowerCase().includes(partOfMemberName.toLowerCase());

  // gibt alle li Elemente aus der Liste zurück
  const chatMembers = () => $$('#chat_members li');

  // fügt die CSS Klasse highlighted hinzu
  const highlight = (element) => element.classList.add('highlighted');

  // entfernt die CSS Klasse highlighted
  const removeHighlight = (element) => element.classList.remove('highlighted');

  // findet ein Element und gibt es zurück um es weiterzuverwenden
  const $ = (queryselector) => document.querySelector(queryselector);
  const $$ = (queryselector) => Array.from(document.querySelectorAll(queryselector));

  init();
}