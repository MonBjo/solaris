/* defining data */
const overlayElem = document.querySelector('.overlay');
const baseUrl = 'https://fathomless-shelf-54969.herokuapp.com/';

import {generateBodies} from './planetarySystem.js';
import {generateEventlisteners} from './overlay.js';

getKey();

/* overlay */
overlayElem.addEventListener('click', () => {
    overlayElem.style.display = 'none';
});


async function getKey() {
    const responseKey = await fetch(`${baseUrl}keys`, {
        method: 'POST'
    });
    
    let dataKey = await responseKey.json();
    let key = dataKey.key;
    
    getBodies(key);
}


async function getBodies(key) {
    const responseBodies = await fetch(`${baseUrl}bodies`, {
        method: 'GET',
        headers: {'x-zocom': key}
    })
    
    let data = await responseBodies.json();
    console.table(data.bodies);
    generateBodies(data.bodies);
    generateEventlisteners(data.bodies);
}

export function setBodiesId(bodyElem, body) {
    bodyElem.id = body.latinName.toLowerCase();
}