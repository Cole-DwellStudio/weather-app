import { stateNameToAbbreviation } from "./stateToAbbr.js";

const weather_APIKEY = "b4258ccea22c4a8c855164431231304";
const giphy_APIKEY = "nCQ95e0a1JOVr3fT6XV4lr4rwlwVAFgs";

async function getWeather(location) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${weather_APIKEY}&q=${location}`
  );
  const responseData = await response.json();
  displayManager.updateDisplay(processData(responseData));
}

function processData(data) {
  let filteredData = {
    temp: data.forecast.forecastday[0].day.maxtemp_f,
    wind: data.forecast.forecastday[0].day.maxwind_mph,
    rain: data.forecast.forecastday[0].day.totalprecip_in,
    city: data.location.name,
    region: data.location.region,
  };
  return filteredData;
}

const displayManager = (() => {
  const locationInput = document.getElementById("locationInput");
  const locationForm = document.getElementById("locationForm");
  const locationName = document.getElementById("locationName");
  const gifToday = document.getElementById("gifToday");

  locationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    getWeather(locationInput.value);
  });

  async function getGif(data) {
    console.log(data);
    let searchTerm = "perfection";
    if (data.rain > 0.5) {
      searchTerm = "rainy";
    } else if (data.rain > 6) {
      searchTerm = "flooding";
    }
    if (data.temp > 90) {
      searchTerm = "this is fine";
    } else if (data.temp > 80) {
      searchTerm = "hot";
    } else if (data.temp < 50) {
      searchTerm = "chilly";
    } else if (data.temp < 20) {
      searchTerm = "freezing";
    }
    if (data.wind > 60) {
      searchTerm = "hurricane";
    } else if (data.wind > 30) {
      searchTerm = "breeze";
    }
    fetchGif(searchTerm).then((url) => (gifToday.src = url));
  }

  function updateDisplay(data) {
    locationName.textContent = `${data.city}, ${stateNameToAbbreviation(
      data.region
    )}`;
    getGif(data);
  }
  return {
    updateDisplay,
  };
})();

async function fetchGif(searchTerm) {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=${giphy_APIKEY}&s=${searchTerm}`,
      { mode: "cors" }
    );
    const responseData = await response.json();
    return responseData.data.images.original.url;
  } catch (e) {
    console.log(e);
  }
}

getWeather("Ittoqqortoormiit");
