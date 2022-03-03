/* defining data */
const overlayElem = document.querySelector('.overlay');
const bodyOverlayElem = document.querySelector('.overlay--body');
const bodiesWrapperElem = document.querySelector('.bodiesWrapper');
const baseUrl = 'https://fathomless-shelf-54969.herokuapp.com/';

getKey();

overlayElem.addEventListener('click', () => {
    overlayElem.style.display = 'none';
});


async function getKey() {
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
    
    let data = await responseBodies.json();
    console.table(data.bodies);
    generateBodies(data.bodies);
    generateEventlisteners(data.bodies);
}

function generateEventlisteners(bodies) {
    const bodiesElem = document.querySelectorAll('.bodiesWrapper--body');
    for(let body of bodiesElem) {
        body.addEventListener('click', event => {
            overlayElem.style.display = 'flex';
            displayData(body.id, bodies);
        });
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
            } else if(body.moons == 1) {
                moonsElem.innerHTML = body.moons[0];
            } else{
                moonsElem.innerHTML = convertArrayToString(body.moons);
            }
            
            setBodiesId(bodyOverlayElem, body);

            break;
        }
    }

}

function convertArrayToString(moons) {
    let stringOfMoons = "";
    for(let moon of moons) {
        stringOfMoons += `${moon}, `;
    }
    stringOfMoons = stringOfMoons.slice(0, -2);
    return stringOfMoons;
}

function generateBodies(bodies) {
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
            bodyElem.style.height = planetSize + "px";
            bodyElem.style.width = planetSize + "px";
        } else {
            console.log("What is going on?");
        }
        
        bodiesWrapperElem.appendChild(bodyElem);
    }
}

function displayBodyAside(bodyElem, body) {
    const starSize = (body.circumference / 6000);
    const starHidden = -(starSize/10)*9;

    bodiesWrapperElem.style.marginLeft = starHidden*-0.1 + "px";
    bodyElem.style.height = starSize + "px";
    bodyElem.style.width = starSize + "px";
    bodyElem.style.left = starHidden + "px";
}

function setBodiesId(bodyElem, body) {
    bodyElem.id = body.latinName.toLowerCase();
}

function setBodiesClass(bodyElem, body){
    bodyElem.classList.add('bodiesWrapper--body');
    if(body.type == "star") {
        bodyElem.classList.add('body--star');
    }
}