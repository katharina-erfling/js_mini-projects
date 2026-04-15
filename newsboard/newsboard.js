'use strict';

{
  // Einstiegspunkt — zeigt die erste Nachricht beim Laden der Seite
  const init = () => {
    showFirstMessage();
    showMessageCount();
    // click Event an die vor und zurück zeichen binden + zusätzlich die zur ersten und letzten Seite
    $('[title=next]').addEventListener('click', nextMessage);
    $('[title=prev]').addEventListener('click', prevMessage);
    $('[title=first]').addEventListener('click', firstMessage);
    $('[title=last]').addEventListener('click', lastMessage);

    // Funktionalität mit Tasten - wenn Pfeiltaste rechts zur nächsten, wenn links zur vorherigen 
    document.addEventListener('keyup', (event) => {
      if (event.key === 'ArrowRight') {
        nextMessage();
        event.preventDefault();
      }
      if (event.key === 'ArrowLeft') {
        prevMessage();
        event.preventDefault();
      }
    });

    // Funktionalität mit Tasten - Pfeiltasten + Alt zur ersten bzw letzten
    document.addEventListener('keyup', (event) => {
      if (event.key === 'ArrowRight' && event.altKey) {
        lastMessage();
        event.preventDefault();
      }
      if (event.key === 'ArrowLeft' && event.altKey) {
        firstMessage();
        event.preventDefault();
      }
    });
  };

  // zeigt die erste Nachricht
  const showFirstMessage = () => {
    showMessageByNumber(1);
  };

  // Dynamisches Auslesen der Gesamtzahl der Nachrichten
  const showMessageCount = () => {
    $('.message_number').textContent = messages.length;
  };

  // vorwärts blättern — preventDefault verhindert dass der Link die URL aufruft
  const nextMessage = (event) => {
    if (currentMessageNumber === messages.length) return;
    showMessageByNumber(currentMessageNumber += 1);
    if (event) event.preventDefault();
  };

  // zurück blättern — preventDefault verhindert dass der Link die URL aufruft
  const prevMessage = (event) => {
    if (currentMessageNumber === 1) return;
    showMessageByNumber(currentMessageNumber -= 1);
    if (event) event.preventDefault();
  };

  // zur ersten Nachricht springen
  const firstMessage = (event) => {
    showMessageByNumber(currentMessageNumber = 1);
    if (event) event.preventDefault();
  };

  // zur letzten Nachricht springen
  const lastMessage = (event) => {
    showMessageByNumber(currentMessageNumber = messages.length);
    if (event) event.preventDefault();
  };

  // zeigt die Nachricht mit der angegebenen Nummer im Newsboard an
  // messageNumber - 1 weil Arrays bei 0 beginnen, Nachrichten aber bei 1 gezählt werden
  const showMessageByNumber = (messageNumber) => {
    $('.newsboard_content').innerHTML = messages[messageNumber - 1];
  };

  // die drei Nachrichten als HTML-Strings
  const messages = [
    `<h1>Tutors are on a strike!!!</h1>
    <h2>All assignmnent are automatically graded with 0 points</h2>
    <p>Duis pretium ornare odio nec cursus. Nulla quis dolor vitae nulla condimentum maximus nec vitae purus. Curabitur ut mi non nulla molestie porta. Curabitur dignissim lacinia condimentum. In hac habitasse platea dictumst. Mauris ut urna magna. Mauris venenatis eu quam nec posuere. Nulla facilisi. Donec convallis sodales massa, et consequat nunc vehicula malesuada.</p>
    <p class="newsboard_footer">9/25/2015 by N. O'body</p>`,

    `<h1>Madness!</h1>
    <h2>How to earn a fortune, with a complete stupid idea</h2>
    <p>Ut molestie elementum risus, eget rutrum dui tristique id. Duis ac elit a mi convallis lacinia. Sed at ultricies magna. Pellentesque nisl est, mattis eget porta eu, rhoncus in urna. Integer faucibus lectus nec malesuada tempus. Duis consectetur sollicitudin ultricies. Cras massa nulla, aliquet vitae interdum quis, venenatis at quam.</p>
    <p class="newsboard_footer">08/13/20156 by Dr. Ken Hurt</p>`,

    `<h1>I did something, and you will never guess what happened next...</h1>
    <h2>Donec tristique, leo at suscipit pellentesque, mauris neque congue leo!</h2>
    <p>Aenean egestas mauris at neque egestas hendrerit id ut erat. Donec iaculis ornare gravida. Vestibulum condimentum, tortor nec eleifend consectetur, justo lacus dignissim ante, eget commodo enim urna sollicitudin arcu. Odio eu leo pulvinar rutrum sed a turpis. Nunc dui tortor, rutrum vitae gravida quis, hendrerit a massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas</p>
    <p>Integer non venenatis tellus. Phasellus tellus leo, suscipit ac vulputate non, varius nec eros. Etiam scelerisque nisi arcu, interdum tempus dui volutpat vel. Donec eget posuere nulla. Etiam ornare dapibus tortor, ac sollicitudin nisi porta a. Donec tristique, leo at suscipit pellentesque, mauris neque congue leo, sed tempor massa justo a ligula. Curabitur vitae rhoncus lacus, quis varius felis. Ut tincidunt sit amet nisl finibus tempus. Curabitur mollis sit amet leo a sagittis.</p>
    <p class="newsboard_footer">2015/06/02 by Chris P. Bacon</p>`,

        `<h1>Another Headline</h1>
    <h2>Donec tristique, leo at suscipit pellentesque, mauris neque congue leo!</h2>
    <p>Aenean egestas mauris at neque egestas hendrerit id ut erat. Donec iaculis ornare gravida. Vestibulum condimentum, tortor nec eleifend consectetur, justo lacus dignissim ante, eget commodo enim urna sollicitudin arcu. Odio eu leo pulvinar rutrum sed a turpis. Nunc dui tortor, rutrum vitae gravida quis, hendrerit a massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas</p>
    <p>Integer non venenatis tellus. Phasellus tellus leo, suscipit ac vulputate non, varius nec eros. Etiam scelerisque nisi arcu, interdum tempus dui volutpat vel. Donec eget posuere nulla. Etiam ornare dapibus tortor, ac sollicitudin nisi porta a. Donec tristique, leo at suscipit pellentesque, mauris neque congue leo, sed tempor massa justo a ligula. Curabitur vitae rhoncus lacus, quis varius felis. Ut tincidunt sit amet nisl finibus tempus. Curabitur mollis sit amet leo a sagittis.</p>
    <p class="newsboard_footer">2015/06/02 by Chris P. Bacon</p>`,
  ];

  // Kurzschreibweise für querySelector
  const $ = (qs) => document.querySelector(qs);
  const $$ = (qs) => Array.from(document.querySelectorAll(qs));

  let currentMessageNumber = 1;

  init(); // startet alles
}