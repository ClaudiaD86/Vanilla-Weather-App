let now = new Date();

let dateToday = document.querySelector("#dateToday");
let time = document.querySelector("#time");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let date = now.getDate();
let year = now.getFullYear();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mai",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

dateToday.innerHTML = `${day}, ${date}.${month}.${year}`;
time.innerHTML = `${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let searchCity = document.querySelector("#searchCity");
  city.innerHTML = searchCity.value;
}

function showTemperature(response) {
  console.log(response);
  let todayTemperature = document.querySelector("#temperature");
  let todayCity = document.querySelector("#city");
  let weather = document.querySelector("#weather");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  let feel = document.querySelector("#feel");

  todayTemperature.innerHTML = Math.round(response.data.main.temp);
  todayCity.innerHTML = response.data.name;
  weather.innerHTML = response.data.weather[0].description;
  wind.innerHTML = `Windspeed: ${Math.round(response.data.wind.speed)} km/h`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  feel.innerHTML = `Feels like ${Math.round(response.data.main.feels_like)}°C`;
}

function showCity(city) {
  let apiKey = "5f45369b2d589f9e2e6a7d33de297c36";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(showTemperature);
}

function handleCity(city2) {
  city2.preventDefault();
  let city = document.querySelector("#searchCity");
  showCity(city.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleCity);

//function convertToFahrenheit(event) {
//event.preventDefault();
//let temperatureElement = document.querySelector("#temperature");
//temperatureElement.innerHTML = 66;
//}

//function convertToCelsius(event) {
//event.preventDefault();
//let temperatureElement = document.querySelector("#temperature");
//temperatureElement.innerHTML = 19;
//}

//let fahrenheitLink = document.querySelector("#fahrenheit-link");
//fahrenheitLink.addEventListener("click", convertToFahrenheit);

//let celsiusLink = document.querySelector("#celsius-link");
//celsiusLink.addEventListener("click", convertToCelsius);
