function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `     
        <div class="col-2">
          <div class="weather-forecast-date">${formatDay(
            forecastDay.time
          )}</div>
            <img src="images/${
              forecastDay.condition.icon
            }.png" alt="" width="36" />
              <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max"> ${Math.round(
                forecastDay.temperature.maximum
              )}°</span>
              <span class="weather-forecast-temperature-min"> ${Math.round(
                forecastDay.temperature.minimum
              )}°</span>
              </div>
          </div>
  
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "54t2b9593a69cfo273eb9d4a10b5f6c4";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute("src", `images/${response.data.condition.icon}.png`);
  iconElement.setAttribute("alt", `images/${response.data.condition.icon}.png`);

  let description = [
    "clear-sky-day",
    "clear-sky-night",
    "few-clouds-day",
    "few-clouds-night",
    "scattered-clouds-day",
    "scattered-clouds-night",
    "broken-clouds-day",
    "broken-clouds-night",
    "shower-rain-day",
    "shower-rain-night",
    "rain-day",
    "rain-night",
    "thunderstorm-day",
    "thunderstorm-night",
    "snow-day",
    "snow-night",
    "mist-day",
    "mist-night",
  ];

  let clearSkyDay = description[0];
  clearSkyDay = `Take sunglasses with you`;
  let clearSkyNight = description[1];
  clearSkyNight = `It will be a starry night`;
  let fewCloudsDay = description[2];
  fewCloudsDay = `Beautiful sunsets need cloudy skies`;
  let fewCloudsNight = description[3];
  fewCloudsNight = `It might be a starry night`;
  let scatteredCloudsDay = description[4];
  scatteredCloudsDay = `Beautiful sunsets need cloudy skies`;
  let scatteredCloudsNight = description[5];
  scatteredCloudsNight = `Dance with the clouds`;
  let brokenCloudsDay = description[6];
  brokenCloudsDay = `The sun always shines above the clouds`;
  let brokenCloudsNight = description[7];
  brokenCloudsNight = `Clouds make a painting of the sky`;
  let showerRainDay = description[8];
  showerRainDay = `Don't forget your umbrella`;
  let showerRainNight = description[9];
  showerRainNight = `Don't forget your umbrella`;
  let rainDay = description[10];
  rainDay = `Don't forget your umbrella`;
  let rainNight = description[11];
  rainNight = `Don't forget your umbrella`;
  let thunderstormDay = description[12];
  thunderstormDay = `The sun always shines after the storm`;
  let thunderstormNight = description[13];
  thunderstormNight = `The sun always shines after the storm`;
  let snowDay = description[14];
  snowDay = `Time to make snow angels if you can`;
  let snowNight = description[15];
  snowNight = `Happiness is catching snowflakes on your tongue`;
  let mistDay = description[16];
  mistDay = `Beyond the fog lies clarity`;
  let mistNight = description[17];
  mistNight = `Beyond the fog lies clarity`;

  let quoteElement = document.querySelector("#quote");
  quoteElement.innerHTML = clearSkyDay;

  console.log(mistNight);
  console.log(response.data.condition.icon);

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "54t2b9593a69cfo273eb9d4a10b5f6c4";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Rio de Janeiro");
