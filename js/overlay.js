/*
 
*/

import { setBodiesId } from "./script.js";
import { starSize } from "./planetarySystem.js";

const overlayElem = document.querySelector('.overlay');
const bodyOverlayElem = document.querySelector('.overlay--body');


export function generateEventlisteners(bodies) {
    const bodiesElem = document.querySelectorAll('.bodiesWrapper--body');
    for(let body of bodiesElem) {
        body.addEventListener('click', event => {
            overlayElem.style.display = 'flex';

            displayData(body.id, bodies);
            adjustBodyOverlay('saturnus');
        });
    }
}

function adjustBodyOverlay(bodyToAdjust){
    if(bodyOverlayElem.id == bodyToAdjust) {
        bodyOverlayElem.style.width = starSize*3 + "px";
    } else {
        bodyOverlayElem.style.width = starSize + "px";
    }
}

function displayData(bodyId, bodies) {
    /* Defining data */
    const titleElem = document.querySelector('.overlay--title');
    const subitleElem = document.querySelector('.overlay--subtitle');
    const descriptionElem = document.querySelector('.overlay--description');
    const circumferenceElem = document.querySelector('#circumference');
    const distanceElem = document.querySelector('#distance');
    const tempratureDayElem = document.querySelector('#tempratureDay');
    const tempratureNightElem = document.querySelector('#tempratureNight');
    const moonsElem = document.querySelector('#moons');
    
    for(let body of bodies) {
        if(bodyId == body.latinName.toLowerCase()){
            console.log(body);
            titleElem.innerHTML = body.name.toUpperCase();
            subitleElem.innerHTML = body.latinName.toUpperCase();
            descriptionElem.innerHTML = body.desc;
            circumferenceElem.innerHTML = body.circumference;
            distanceElem.innerHTML = body.distance;
            tempratureDayElem.innerHTML = body.temp.day;
            tempratureNightElem.innerHTML = body.temp.night;

            
            if(body.moons == 0) {
                moonsElem.innerHTML = "Inga månar";
            } else {
                moonsElem.innerHTML = body.moons.join(', ');
            }

            setBodiesId(bodyOverlayElem, body);

            break;
        }
    }
}
