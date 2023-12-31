import { weatherApiKey } from "./config.js";

let cityNameInput = document.getElementById("city");
let backButton = document.getElementById("back");
let btnSearch = document.querySelector(".weather .enter-city button");

backButton.style.display = "none";

btnSearch.addEventListener("click", () => {
     let inputWord = cityNameInput.value;
     let url = `https://api.openweathermap.org/data/2.5/weather?q={${inputWord}}&appid={${weatherApiKey}}`;

     console.log(url);
     fetch(url)
          .then((response) => response.json())
          .then((data) => {
               console.log(data);
          })
          .catch((error) => {
               alert(error.message);
          });
});
