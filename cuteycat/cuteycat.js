'use strict';

const $ = (qs) => document.querySelector(qs);
const $$ = (qs) => Array.from(document.querySelectorAll(qs));   


{
    
    const init = () => {

    

    

    const candidates = $$('#candidates li');

    candidates.forEach((cats) => {
        cats.addEventListener('click', () => {
            const cutestNames = $$('#cutest span').map(span => span.textContent);
            const catName = cats.querySelector('span').textContent;
            if (cutestNames.includes(catName)) {
                return;
            };

            if ($$('#cutest span').length >= 3) {
                return;
            };

            const clone = cats.cloneNode(true);
            clone.addEventListener('click', () => {
                clone.remove();
            });
            $('#cutest').appendChild(clone);
            




        });
    });

    };

    init();

};