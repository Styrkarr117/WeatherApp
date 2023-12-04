//Const Doc
const city = document.querySelector("#city");

const temperature = document.querySelector("#temperature");
const temperatureUnit = document.querySelector("#temperature-unit");

const apparentTemperature = document.querySelector("#apparent-temperature");
const apparentTemperatureUnit = document.querySelector(
  "#apparent-temperature-unit"
);

const humidity = document.querySelector("#humidity");
const humidityUnit = document.querySelector("#humidity-unit");

const windSpeed = document.querySelector("#wind-speed");
const windSpeedUnit = document.querySelector("#wind-speed-unit");

//Url API Weather
const urlOpenMeteoApi = `https://api.open-meteo.com/v1/forecast?latitude=${cityLocalisation.latitude}&longitude=${cityLocalisation.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m`;
//API call
async function apiCall(url) {
  const response = await fetch(url);
  return await response.json();
}
//Acces all Data
function weatherDataWrite(data) {
  city.innerText = "Bienvenue à " + cityLocalisation.name;

  temperature.innerText =
    "Actuellement, il fait " + data.current.temperature_2m;
  temperatureUnit.innerText = data.current_units.temperature_2m;

  apparentTemperature.innerText =
    "Ressenti d'environ " + data.current.apparent_temperature;
  apparentTemperatureUnit.innerText = data.current_units.apparent_temperature;

  humidity.innerText =
    "Le taux d'humidité est d'environ " + data.current.relative_humidity_2m;
  humidityUnit.innerText = data.current_units.relative_humidity_2m;

  windSpeed.innerText =
    "La vitesse du vent actuelle est d'environ " + data.current.wind_speed_10m;
  windSpeedUnit.innerText = data.current_units.wind_speed_10m;
}
// run
let apiCallCount = 0;

function timerStart() {
  // debug
  apiCallCount++;
  console.log(`api call n°${apiCallCount}`);

  apiCall(urlOpenMeteoApi).then((data) => {
    //debug
    console.log(data);

    weatherDataWrite(data);
  });
  setTimeout(() => {
    timerStart();
  }, 3600000); // 1h, 60.000 mlsec/min
}

timerStart();
