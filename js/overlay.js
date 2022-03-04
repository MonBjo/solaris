/*
 Many variable names are similare to the ones that has to do with the planetary system so 
 I thought it would be clearer to have the overlay functions in their own module. 
 There are also a lot of teeny tiny functions with the overlay and I think it makes sense
 to have them in their own module since they're not used anywhere else.
*/

import { setBodiesId } from "./script.js";
import { starSize } from "./planetarySystem.js";

const overlayElem = document.querySelector('.overlay');
const bodyOverlayElem = document.querySelector('.overlay--body');


overlayElem.addEventListener('click', () => {
    overlayElem.style.display = 'none';
});

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
        bodyOverlayElem.style.position = "absolute";
    } else {
        bodyOverlayElem.style.width = starSize + "px";
    }
}

function displayData(bodyId, bodies) {
    for(let body of bodies) {
        if(bodyId == body.latinName.toLowerCase()){
            //console.log("You clicked on: ", body);

            setTitle(body);
            setSubtitle(body);
            setDescription(body);

            setCircumference(body);
            setDistance(body);
            setTempratureDay(body);
            setTempratureNight(body);

            setMoons(body);

            setBodiesId(bodyOverlayElem, body);

            break;
        }
    }
}

function setTitle(body) {
    const titleElem = document.querySelector('.overlay--title');
    titleElem.innerHTML = body.name.toUpperCase();
}

function setSubtitle(body) {
    const subitleElem = document.querySelector('.overlay--subtitle');
    subitleElem.innerHTML = body.latinName.toUpperCase();
}

function setDescription(body) {
    const descriptionElem = document.querySelector('.overlay--description');
    descriptionElem.innerHTML = body.desc;
}

function setCircumference(body) {
    const circumferenceElem = document.querySelector('#circumference');
    circumferenceElem.innerHTML = `${body.circumference} km`;
}

function setDistance(body){
    const distanceElem = document.querySelector('#distance');
    distanceElem.innerHTML = `${body.distance} km`;
}

function setTempratureDay(body){
    const tempratureDayElem = document.querySelector('#tempratureDay');
    tempratureDayElem.innerHTML = `${body.temp.day}C`;
}

function setTempratureNight(body) {
    const tempratureNightElem = document.querySelector('#tempratureNight');
    tempratureNightElem.innerHTML = `${body.temp.night}C`;
}


/* * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * * * * * * * * * *\
 * https://github.com/ryanmcdermott/clean-code-javascript#dont-use-flags-as-function-parameters *
\* * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * * * * * * * * * * * */

function setMoons(body){
    const moonsElem = document.querySelector('#moons');
    if(body.moons == 0) {
        moonsElem.innerHTML = "Inga månar";
    } else {
        moonsElem.innerHTML = body.moons.join(', ');
    }
}
