// https://api.openweathermap.org/data/2.5/weather?q=Denver&units=imperial&appid=1593392b76ae44939631289e7f3a7263 //

const humidityCheckbox = document.getElementById("humidityFilter");
const descriptionCheckbox = document.getElementById("descriptionFilter");
const windCheckbox = document.getElementById("windFilter");

let weather = {
  apikey: "1593392b76ae44939631289e7f3a7263",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        this.apikey
    )
      .then((Response) => Response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".temp").innerText = temp + "°F";
    document.querySelector(".description").innerText = description;
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind Speed: " + speed + " mph";
    document.querySelector(".weather").classList.remove("loading");
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

// allows enter key to search
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

// default search
weather.fetchWeather("New York");

// hides humidity
humidityCheckbox.addEventListener("change", (event) => {
  if (event.currentTarget.checked) {
    document.getElementsByClassName("humidity")[0].style.visibility = "hidden";
  }
});

// hides desc
descriptionCheckbox.addEventListener("change", function (event) {
  if (event.currentTarget.checked) {
    document.getElementsByClassName("description")[0].style.visibility =
      "hidden";
  }
});

// hides wind speed
windCheckbox.addEventListener("change", function (event) {
  if (event.currentTarget.checked) {
    document.getElementsByClassName("wind")[0].style.visibility = "hidden";
  }
});
