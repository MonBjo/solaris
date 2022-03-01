const bodiesWrapperElem = document.querySelector('.bodiesWrapper');

const baseUrl = 'https://fathomless-shelf-54969.herokuapp.com/';
//let key = '';

getKey();


async function getKey(){
    const response = await fetch(`${baseUrl}keys`, {
        method: 'POST'
    });
    
    console.log('getKey() - response: ', response);
    
    let data = await response.json();
    console.log('getKey() - Key: ', data.key);
    const key = data.key;
    getBodies(key);
}

async function getBodies(key) {
    let response = await fetch(`${baseUrl}bodies`, {
        method: 'GET',
        headers: {'x-zocom': key}
    })
    console.log("getPlanets() - response: ", response);

    let data = await response.json();
    console.table(data.bodies);
    generateBodies(data.bodies);
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
        bodiesWrapperElem.style.marginLeft = starHidden*-3 + "px";
        
        if(body.type == "star") {
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
    }
}