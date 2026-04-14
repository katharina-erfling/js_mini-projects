'use strict';

{
  // Hole alle Mitglieder, behalte nur die, die passen und hebe sie hervor
  //entferne zusätzlich alle die ggf. schon da sind
  const highlightChatMembersBy = (partOfMemberName) => {
    removeHighlightsFromAllChatMembers();
    chatMembers()
      .filter((member) => doesMemberMatch(partOfMemberName, member))
      .forEach(highlight);
  };

  //entfernt alle Highlights (damit "zusammengesetzte" Markierungen funktionieren)
  const removeHighlightsFromAllChatMembers = () => {
    chatMembers().forEach(removeHighlight);
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




  // findet das Element und gibt es zurück um es weiterzuverwenden
  const $ = (queryselector) => document.querySelector(queryselector);
  const $$ = (queryselector) => Array.from(document.querySelectorAll(queryselector));




  // Beobachte das Suchfeld — sobald eine Taste losgelassen wird, schau was drin steht
  // und übergib es an highlightChatMembersBy
  $('#member_search input').addEventListener('keyup', () => {
    highlightChatMembersBy($('#member_search input').value);
  });
}