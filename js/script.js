/* 
 This is more of a general module or the starter module. To have where I fetch the key and get the data from
 the API in and one function that is used in the other two modules, planetarySystem.js and overlay.js
*/

const baseUrl = 'https://fathomless-shelf-54969.herokuapp.com/';

import {generateBodies} from './planetarySystem.js';
import {generateEventlisteners} from './overlay.js';

getKey();

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
    console.table("All the bodies in the planetary system: ", data.bodies);
    generateBodies(data.bodies);
    generateEventlisteners(data.bodies);
}


export function setBodiesId(bodyElem, body) {
    bodyElem.id = body.latinName.toLowerCase();
}