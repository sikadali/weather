import { weatherApiKey } from "./config.js"; // i have my API keys there

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

let weatherBodyElement = document.querySelector(".weather .weather-body");

document.getElementById("back").style.display = "none";

document.querySelector(".weather .enter-city button").addEventListener("click", () => getAPIResults());
document.getElementById("get-location").addEventListener("click", getDeviceLocation);
document.getElementById("back").addEventListener("click", backToSearch);
document.getElementById("city").addEventListener("keypress", pressEnter);

function getAPIResults(position) {
     let inputWord = document.getElementById("city").value;
     let url = position
          ? `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${weatherApiKey}&units=metric`
          : `https://api.openweathermap.org/data/2.5/weather?q=${inputWord}&appid=${weatherApiKey}&units=metric`;

     console.log(url);

     fetch(url)
          .then((response) => response.json())
          .then((data) => {
               console.log(data);
               displayResults(
                    parseInt(data.main.temp),
                    parseInt(data.main.feels_like),
                    data.weather[0].description,
                    data.name,
                    regionNames.of(data.sys.country),
                    getTodayDate(),
                    parseInt(data.main.temp_max),
                    parseInt(data.main.temp_min),
                    parseInt(data.main.humidity),
                    parseInt(convertToMph(parseInt(data.wind.speed))),
                    convertTimestamptoTime(parseInt(data.sys.sunrise)),
                    convertTimestamptoTime(parseInt(data.sys.sunset)),
                    data.weather[0].icon
               );
          })
          .catch((error) => {
               alert(error.message);
          });
}

function displayResults(
     temp,
     feelsLike,
     description,
     city,
     country,
     date,
     tempMax,
     tempMin,
     humidity,
     windSpeed,
     sunrise,
     sunset,
     icon
) {
     weatherBodyElement.innerHTML = `
        <div class="date">${date}</div>
        <div class="main">
            <div class="basic-data">
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather-icon" height="100px">
                <div class="temp">
                    <h1>${temp}°C</h1>
                    <h5>${description}</h5>
                </div> 
            </div>
            <div class="feels-like">
                <h2>${feelsLike}°C</h2>
                <h6>Feels like</h6>
            </div>
        </div>
        <div class="display-city">
            <span class="material-symbols-outlined">pin_drop</span>
            <h5>${city}, ${country}</h5>
        </div>
        <hr />
        <div class="details">
            <div class="high-low">
                <h3>${tempMax}°C</h3><h5>High</h5>
                <h3>${tempMin}°C</h3><h5>Low</h5>
            </div>
            <div class="wind-humidity">
                <h3>${windSpeed}mph</h3><h5>Wind</h5>
                <h3>${humidity}%</h3><h5>Humidity</h5>
            </div>
            <div class="sunrise-sunset">
                <h3>${sunrise}</h3><h5>Sunrise</h5>
                <h3>${sunset}</h3><h5>Sunset</h5>
            </div>
        </div>
    `;
     document.getElementById("back").style.display = "block";
}

function backToSearch() {
     weatherBodyElement.innerHTML = `
      <div class="enter-city">
          <input type="text" name="city-name" id="city" placeholder="Enter city name">
          <button><span class="material-symbols-outlined">search</span></button>
      </div>
      <hr class="or"/>
      <button id="get-location">Get Device Location</button>
  `;
     document.querySelector(".weather .enter-city button").addEventListener("click", () => getAPIResults());
     document.getElementById("get-location").addEventListener("click", getDeviceLocation);
     document.getElementById("city").addEventListener("keypress", pressEnter);
     document.getElementById("back").style.display = "none";
}

function pressEnter(e) {
     if (e.key === "Enter") {
          e.preventDefault();
          document.querySelector(".weather .enter-city button").click();
     }
}

function getTodayDate() {
     const currentDate = new Date();
     const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
     return currentDate.toLocaleDateString("en-us", options);
}

function convertToMph(meterPerSec) {
     return meterPerSec / 0.44704;
}

function convertTimestamptoTime(unixTimestamp) {
     // Convert to milliseconds and
     // then create a new Date object
     let dateObj = new Date(unixTimestamp * 1000);

     // Get hours from the timestamp
     let hours = dateObj.getUTCHours();

     // Get minutes part from the timestamp
     let minutes = dateObj.getUTCMinutes();

     // Get seconds part from the timestamp
     let seconds = dateObj.getUTCSeconds();

     let formattedTime = hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0");

     return formattedTime;
}

function getDeviceLocation() {
     if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(getAPIResults);
     } else {
          alert("Geolocation is not supported by this browser.");
     }
}
