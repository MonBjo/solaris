/*
 Many variable names are similare to the ones that has to do with the overlay so 
 I thought it would be clearer to have the planetary system functions in their own module. 
*/

const bodiesWrapperElem = document.querySelector('.bodiesWrapper');
const bodyOverlayElem = document.querySelector('.overlay--body');
export let starSize;

import { setBodiesId } from "./script.js";

export function generateBodies(bodies) {
    for(let body of bodies){
        /* Defining data */
        const bodyElem = document.createElement('aside');
        const planetSize = (body.circumference / 2000);
        
        
        setBodiesId(bodyElem, body);
        setBodiesClass(bodyElem, body);
        
        if(body.type == "star") {
            displayBodyAside(bodyElem, body);
            displayBodyAside(bodyOverlayElem, body);
        } else if(body.type == "planet") {
            styleBodies(bodyElem, planetSize);
        } else {
            console.log("What is going on?");
        }
        
        bodiesWrapperElem.appendChild(bodyElem);
    }
}

function styleBodies(bodyElem, planetSize){
    bodyElem.style.height = planetSize + "px";
    bodyElem.style.width = planetSize + "px";
}


function displayBodyAside(bodyElem, body) {
    starSize = (body.circumference / 6000);
    const starHidden = -(starSize/10)*9;
    
    bodiesWrapperElem.style.marginLeft = starHidden*-0.1 + "px";
    bodyElem.style.height = starSize + "px";
    bodyElem.style.width = starSize + "px";
    bodyElem.style.left = starHidden + "px";
}


function setBodiesClass(bodyElem, body){
    bodyElem.classList.add('bodiesWrapper--body');
    if(body.type == "star") {
        bodyElem.classList.add('body--star');
    }
}