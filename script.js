/* defining data */
const overlayElem = document.querySelector('.overlay');
const bodiesWrapperElem = document.querySelector('.bodiesWrapper');
const baseUrl = 'https://fathomless-shelf-54969.herokuapp.com/';

getKey();

overlayElem.addEventListener('click', () => {
    overlayElem.style.display = 'none';
});

async function getKey(){
    const responseKey = await fetch(`${baseUrl}keys`, {
        method: 'POST'
    });
    
    let dataKey = await responseKey.json();
    const key = dataKey.key;
    
    getBodies(key);
}

async function getBodies(key) {
    const responseBodies = await fetch(`${baseUrl}bodies`, {
        method: 'GET',
        headers: {'x-zocom': key}
    })
    console.log("getPlanets() - responseBodies: ", responseBodies);
    
    let data = await responseBodies.json();
    console.table(data.bodies);
    generateBodies(data.bodies);
    generateEventlisteners(data.bodies);
}

function generateEventlisteners(bodies) {
    const bodiesElem = document.querySelectorAll('.bodiesWrapper--body');
    for(let body of bodiesElem) {
        body.addEventListener('click', event => {
            overlayElem.style.display = 'block';
        });
    }
}

function generateBodies(bodies) {
    for(let body of bodies){
        /* Defining data */
        const bodyElem = document.createElement('aside');
        const planetSize = (body.circumference / 2000);
        const starSize = (body.circumference / 6000);
        const starHidden = -(starSize/10)*9;
        
        bodyElem.id = body.latinName.toLowerCase();
        
        bodyElem.classList.add('bodiesWrapper--body');
        
        if(body.type == "star") {
            bodiesWrapperElem.style.marginLeft = starHidden*-0.1 + "px";

            bodyElem.classList.add('body--star');
            bodyElem.style.height = starSize + "px";
            bodyElem.style.width = starSize + "px";
            bodyElem.style.left = starHidden + "px";
            
        } else if(body.type == "planet") {
            bodyElem.style.height = planetSize + "px";
            bodyElem.style.width = planetSize + "px";
        } else {
            console.log("What is going on?");
        }
        
        bodiesWrapperElem.appendChild(bodyElem);

        //generateEventlisteners(bodyElem, body)
    }
}
/*
function generateEventlisteners(bodyElem, bodyData) {
    bodyElem.addEventListener('click', event => {
        console.log("this ", this);
        console.log("event ", event);
        console.log("body ", bodyData);
        console.log("bodyElem ", bodyElem);
    });
}
*/