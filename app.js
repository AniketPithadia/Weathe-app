const apiKey = "3265874a2c77ae4a04bb96236a642d2f";

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

const form = document.getElementById("form");
const main = document.getElementById("main");
const search = document.getElementById("search");
async function getWeatherByLocation(city) {
  const resp = await fetch(url(city), { origin: "cors" });
  const respData = await resp.json();
  addWeatherToPage(respData, city);
}

function KtoC(k) {
  return Math.floor(k - 273.15);
}

function addWeatherToPage(data, city) {
  const temp = KtoC(data.main.temp);
  let cityCapitalize = city;

  const modifiedCity =
    cityCapitalize.charAt(0).toUpperCase() + cityCapitalize.slice(1);
  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
        <div>
        <h1 class = "w-heading">${modifiedCity}</h1>
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
        <small>${data.weather[0].main}</small>
        </div>
    `;
  weather.addEventListener("dblclick", closeCard);
  main.appendChild(weather);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = search.value;
  if (city) {
    getWeatherByLocation(city);
  }
  search.value = "";
});
function closeCard() {
  main.remove();
}
