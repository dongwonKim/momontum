const weather = document.querySelector(".js-date");
const API_KEY = "8e48ebdafaebaed97d6bd9b6ced3f3fe";
const CORDS = "cords";

function getWeather(lat, long){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(CORDS, JSON.stringify(coordsObj));
}

function hadleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function hadleGeoError(){
    console.log("Cant get geo");
}

function askForCords(){
    navigator.geolocation.getCurrentPosition(hadleGeoSuccess, hadleGeoError);
}

function loadCords(){
    const loadedCords = localStorage.getItem(CORDS);
    if(loadedCords === null){
        askForCords();
    } else {
        const parseCoords = JSON.parse(loadedCords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCords();
}

init();