import { weatherApiKey } from "./config.js"; // i have my API keys there

let weatherBodyElement = document.querySelector(".weather .weather-body");

document.getElementById("back").style.display = "none";

document.querySelector(".weather .enter-city button").addEventListener("click", getAPIResults);
document.getElementById("back").addEventListener("click", backToSearch);
document.getElementById("city").addEventListener("keypress", pressEnter);

function getAPIResults() {
     let inputWord = document.getElementById("city").value;
     let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputWord}&appid=${weatherApiKey}&units=metric`;

     console.log(url);

     fetch(url)
          .then((response) => response.json())
          .then((data) => {
               console.log(data);
               displayResults();
          })
          .catch((error) => {
               alert(error.message);
          });
}

function displayResults() {
     weatherBodyElement.innerHTML = `
        <div class="date">Monday, 29th August 2023</div>
        <div class="main">
            <div class="basic-data">
                <img src="images/clear.png" alt="weather-icon" height="100px">
                <div class="temp">
                    <h1>13°C</h1>
                    <h5>Broken Clouds</h5>
                </div> 
            </div>
            <div class="feels-like">
                <h2>12°C</h2>
                <h6>Feels like</h6>
            </div>
        </div>
        <div class="display-city">
            <span class="material-symbols-outlined">pin_drop</span>
            <h5>Kathmandu, Nepal</h5>
        </div>
        <hr />
        <div class="details">
            <div class="high-low">
                <h3>15°C</h3><h5>High</h5>
                <h3>10°C</h3><h5>Low</h5>
            </div>
            <div class="wind-humidity">
                <h3>7mph</h3><h5>Wind</h5>
                <h3>84%</h3><h5>Humidity</h5>
            </div>
            <div class="sunrise-sunset">
                <h3>05:27</h3><h5>Sunrise</h5>
                <h3>20:57</h3><h5>Sunset</h5>
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
     document.querySelector(".weather .enter-city button").addEventListener("click", getAPIResults);
     document.getElementById("back").style.display = "none";
}

function pressEnter(e) {
     if (e.key === "Enter") {
          e.preventDefault();
          document.querySelector(".weather .enter-city button").click();
     }
}
