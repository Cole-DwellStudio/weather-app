import { stateNameToAbbreviation } from "./stateToAbbr.js";

const locationInput = document.getElementById("locationInput");
const locationForm = document.getElementById("locationForm");
const locationName = document.getElementById("locationName");

async function getWeather(location) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=d61071a36bc2461f966163931230804&q=${location}`
  );
  const responseData = await response.json();
  locationName.textContent = `${
    responseData.location.name
  }, ${stateNameToAbbreviation(responseData.location.region)}`;
  console.log(responseData);
}

locationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather(locationInput.value);
});

getWeather("loveland, co");
