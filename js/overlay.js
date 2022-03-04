/*
 Many variable names are similar to the ones that has to do with the planetary system so 
 I thought it would be clearer to have the overlay functions in their own module. 

 There are also a lot of teeny tiny functions with the overlay and I think it makes sense
 to have them in their own module since they're not used anywhere else. It makes it 
 easier to find the function you're looking for.
*/

import { setBodiesId } from "./script.js";

const overlayElem = document.querySelector('.overlay');
const bodyOverlayElem = document.querySelector('.overlay--body');


overlayElem.addEventListener('click', () => {
    overlayElem.style.display = 'none';
});

export function generateEventlisteners(bodiesData) {
    const bodiesElem = document.querySelectorAll('.bodiesWrapper--body');
    for(let body of bodiesElem) {
        body.addEventListener('click', () => {
            overlayElem.style.display = 'flex';
            displayData(body.id, bodiesData);

            const bodyToAdjust = "saturnus";
            if(bodyOverlayElem.id == bodyToAdjust) {
                adjustBodyOverlay();
            }
        });
    }
}

function adjustBodyOverlay(){
    /* it loses is styled position due to the psuedo-element. Check around line 96 in style.css */
    bodyOverlayElem.style.position = "absolute";
}

function displayData(bodyId, bodies) {
    for(let body of bodies) {
        if(bodyId == body.latinName.toLowerCase()){
            console.log("You clicked on: ", body);

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
    circumferenceElem.innerHTML = `${body.circumference.toLocaleString('sv-SV')} km`;
}

function setDistance(body){
    const distanceElem = document.querySelector('#distance');
    distanceElem.innerHTML = `${body.distance.toLocaleString('sv-SV')} km`;
}

function setTempratureDay(body){
    const tempratureDayElem = document.querySelector('#tempratureDay');
    tempratureDayElem.innerHTML = `${body.temp.day}C`;
}

function setTempratureNight(body) {
    const tempratureNightElem = document.querySelector('#tempratureNight');
    tempratureNightElem.innerHTML = `${body.temp.night}C`;
}


function setMoons(body){
    const moonsElem = document.querySelector('#moons');
    if(body.moons == 0) {
        moonsElem.innerHTML = "Inga månar";
    } else {
        moonsElem.innerHTML = body.moons.join(', ');
    }
}
