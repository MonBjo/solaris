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
    getPlanets(key);
}

async function getPlanets(key) {
    let response = await fetch(`${baseUrl}bodies`, {
        method: 'GET',
        headers: {'x-zocom': key}
    })
    console.log("getPlanets() - response: ", response);

    let data = await response.json();
    console.table( data.bodies);
}