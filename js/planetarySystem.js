/*
 Many variable names are similare to the ones that has to do with the overlay so 
 I thought it would be clearer to have the planetary system functions in their own 
 module so they don't get mixed together. 
*/

const bodiesWrapperElem = document.querySelector('.bodiesWrapper');
const bodyOverlayElem = document.querySelector('.overlay--body');
let starSize;

import { setBodiesId } from "./script.js";

export function generateBodies(bodies) {
    for(let body of bodies){
        const bodyElem = document.createElement('aside');
        const planetSize = (body.circumference / 2000);
        
        setBodiesId(bodyElem, body);
        setBodiesClass(bodyElem, body);
        
        if(body.type == "star") {
            styleBodyAside(bodyElem, body);
            styleBodyAside(bodyOverlayElem, body);
        } else if(body.type == "planet") {
            styleBodySize(bodyElem, planetSize);
        } else {
            console.log("What is going on?");
        }
        
        bodiesWrapperElem.appendChild(bodyElem);
    }
}


function styleBodyAside(bodyElem, body) {
    starSize = (body.circumference / 5000);
    //starSize = (body.circumference / 6000);
    const visiblePercent = 0.9;
    const starHidden = -starSize * visiblePercent;
    
    bodyElem.style.left = starHidden + "px";
    adjustBodiesWrapper(starHidden);

    styleBodySize(bodyElem, starSize);
}

function adjustBodiesWrapper(starHidden) {
    bodiesWrapperElem.style.marginLeft = starHidden*-0.1 + "px";
}

function styleBodySize(bodyElem, size) {
    bodyElem.style.height = size + "px";
    bodyElem.style.width = size + "px";
}

function setBodiesClass(bodyElem, body) {
    bodyElem.classList.add('bodiesWrapper--body');
    if(body.type == "star") {
        bodyElem.classList.add('body--star');
    }
}