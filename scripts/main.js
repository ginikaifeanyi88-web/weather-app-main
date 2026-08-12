import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { Dropdown} from "./utilities/dropDown.js";
const dropDown = new Dropdown();
 import { getGeoData, retrieveCoordinates, getWeatherData } from "./data/weatherData.js";

// unitsMenu functionality
const dropDownIcon = document.querySelector(".units-button");
const unitsMenu = document.querySelector(".units-menu");
const unitChoices = document.querySelectorAll(".unit-type-choice");
dropDownIcon.addEventListener("mouseover", ()=>{
    unitsMenu.style.display ="block";
})

dropDownIcon.addEventListener("click", ()=>{
    unitsMenu.style.display ="block";
})

dropDownIcon.addEventListener("mouseout", ()=>{
   setTimeout(dropDown.isStillHovering(unitsMenu, dropDownIcon),1000);
})

unitsMenu.addEventListener("mouseout", ()=>{
    setTimeout(dropDown.isStillHovering(unitsMenu, dropDownIcon),1000);
})

unitChoices.forEach((unitChoice)=>{
    unitChoice.addEventListener("click", ()=>{
        console.log("elo")
    })
})

//find weather code of the day
function findWeatherCode(weatherCode) {
    let result ="";
    switch(weatherCode) {
        case 0:
            result = "icon-sunny";
            break;
        case 1:
            result="icon-partly-cloudy";
            break;
        case 2:
            result="icon-partly-cloudy";
            break;
        case 3:
            result="icon-overcast";
            break;
        case 45:
            result="icon-fog";
            break;
        case 48:
            result="icon-fog";
            break;
        case 51:
            result="icon-drizzle";
            break;
        case 53:
            result="icon-drizzle";
            break;
        case 55:
            result="icon-drizzle";
            break;
        case 56:
            result="icon-drizzle";
            break;
        case 57:
            result="icon-drizzle";
            break;
        case 61:
            result="icon-rain";
            break;
        case 63:
            result="icon-rain";
            break;
        case 65:
            result="icon-rain";
            break;
        case 66:
            result="icon-rain";
            break;
        case 67:
            result="icon-rain";
            break;
        case 71:
            result="icon-snow";
            break;
        case 73:
            result="icon-snow";
            break;
        case 75:
            result="icon-snow";
            break;
        case 77:
            result="icon-snow";
            break;
        case 80:
            result="icon-rain";
            break;
        case 81:
            result="icon-rain";
            break;
        case 82:
            result="icon-rain";
            break;
        case 85:
            result="icon-snow";
            break;
        case 86:
            result="icon-snow";
            break;
        case 95:
            result="icon-storm";
            break;
        case 96:
            result="icon-storm";
            break;
        case 99:
            result="icon-storm";
            break;
    }
    return result;
}

// hourly days menu functionality

const hourlyDropDown = document.querySelector(".hourly-forecast-button");
const hourlyMenu = document.querySelector(".hourly-menu");
const hourlyChoices = document.querySelectorAll(".hourly-type-choice");
hourlyDropDown.addEventListener("mouseover", ()=>{
    hourlyMenu.style.display ="block";
})

hourlyDropDown.addEventListener("click", ()=>{
    hourlyMenu.style.display ="block";
})

hourlyDropDown.addEventListener("mouseout", ()=>{
   setTimeout(dropDown.isStillHovering(hourlyMenu, hourlyDropDown),2000);
})

hourlyMenu.addEventListener("mouseout", ()=>{
    setTimeout(dropDown.isStillHovering(hourlyMenu, hourlyDropDown),2000);
})

hourlyChoices.forEach((hourlyChoice)=>{
    hourlyChoice.addEventListener("click", ()=>{
        console.log("delo")
    })
})

// load data to  page
const mainLocation = document.querySelector(".location");
const dateContainer = document.querySelector(".date");
const currentTemp = document.querySelector(".temp");
const currentIcon = document.querySelector(".weather-symbol");
const feelsLike = document.querySelector(".js-current-temp");
const currentHumidity = document.querySelector(".js-current-humidity");
const currentPrecipitation =document.querySelector(".js-current-precipitation");
const currentWindSpeed = document.querySelector(".js-current-wind-speed");
const dailyItems = document.querySelector(".daily-forecast-items");
const hourlyItems = document.querySelector(".hourly-forecast-items");
const dayChose = document.querySelector(".hourly-day-chose");
const today = dayjs();
dayChose.innerHTML = today.format("dddd");
dateContainer.innerHTML = today.format('dddd, MMMM D YYYY');
function loadDataToView(geoCoordinatesInput, weatherDataInput) {
    mainLocation.innerHTML = geoCoordinatesInput.results[0].name + ", "+ geoCoordinatesInput.results[0].country;
    console.log(geoCoordinatesInput.results[0].name)
    currentTemp.innerHTML =Math.round(weatherDataInput.daily.temperature_2m_max[0])+"°";
    currentIcon.setAttribute("src", `/assets/images/${findWeatherCode(weatherDataInput.daily.weather_code[0])}.webp`);
    feelsLike.innerHTML = Math.round(weatherDataInput.current.temperature_2m)+"°";
    currentHumidity.innerHTML = Math.round(weatherDataInput.current.relative_humidity_2m) + "%";
    currentWindSpeed.innerHTML = Math.round(weatherDataInput.current.wind_speed_10m) + " km/hr";
    currentPrecipitation.innerHTML = Math.round(weatherDataInput.current.precipitation) + " mm";
    let dailyForecastHTML = ``;
    const dailyMaxTemps = weatherDataInput.daily.temperature_2m_max;
     const dailyMinTemps = weatherDataInput.daily.temperature_2m_min;
     const theWeatherCode = weatherDataInput.daily.weather_code;
     
    for (let i=0;i<7;i++) {
        let dayOfWeek = today.add(i, 'days');
        dailyForecastHTML += `<div class="daily-forecast-item">
    <p class="day-of-week">${dayOfWeek.format('ddd')}</p>
    <img src="assets/images/${findWeatherCode(theWeatherCode[i])}.webp" alt="tue-icon">
    <div class="day-temperatures">
      <p class="max-temp">${Math.round(dailyMaxTemps[i])}°</p>
      <p class="min-tep">${Math.round(dailyMinTemps[i])}°</p>
    </div>
  </div>`;

    }
    let hourlHTML = ``;
    const hourlyTemps = weatherDataInput.hourly.temperature_2m;
    const hourlyCodes = weatherDataInput.hourly.weather_code;
    for (let j=0;j<24;j++) {
        let specificHour = "";
        if (j == 0) {
            specificHour = "0 AM"
        } else if (j == 12) {
            specificHour = "12 PM"
        } else if (j > 0 && j < 12) {
            specificHour=  j + " AM";
        } else if (j > 12) {
            specificHour = (j-12)+ " PM";
        }
        hourlHTML += `  <div class="hourly-forecast-item">
    <img src="assets/images/${findWeatherCode(hourlyCodes[j])}.webp" alt="hourly-forecast-img">
    <p class="hour-of-day">${specificHour}</p>
    <p class="hourly-temp">${Math.round(hourlyTemps[j])}°</p>
  </div>`;
    }
    hourlyItems.innerHTML = hourlHTML;
    dailyItems.innerHTML = dailyForecastHTML;

}

// search bar functionaluity

const searchBar = document.querySelector("#search-bar");

const recentSearches = document.querySelector(".recent-searches");
const searchButton = document.querySelector("#search-button");
  const weatherLocationData = {};
searchBar.addEventListener("click", ()=>{
    dropDown.isStillFocusing(searchBar, recentSearches);
})

const recentSearchOptions = document.querySelectorAll(".recent-search");
recentSearchOptions.forEach((recentSearchOption)=>{
    recentSearchOption.addEventListener("click", ()=>{
        console.log("scooby dooby doo")
        recentSearches.style.display = "none";
    })
})

searchBar.addEventListener("keydown", async (event)=>{
    const searchValue = searchBar.value;
if (event.code == "Enter") {
    console.log("hi");
  const geoCoordinates = await  retrieveCoordinates(searchValue);
  const weatherLocationData = await getWeatherData(geoCoordinates.results[0].latitude, geoCoordinates.results[0].longitude);
  console.log(weatherLocationData);
    loadDataToView(geoCoordinates, weatherLocationData);
}
})

searchButton.addEventListener("click", async ()=>{
    const searchValue = searchBar.value;

    console.log("this is")
     const geoCoordinates = await  retrieveCoordinates(searchValue);
    const weatherLocationData = await getWeatherData(geoCoordinates.results[0].latitude, geoCoordinates.results[0].longitude);
  console.log(weatherLocationData);
  loadDataToView(geoCoordinates, weatherLocationData);
})

// body event listener

const body = document.querySelector("body");
body.addEventListener("click", (event)=>{
    if (event.target ==  searchBar || event.target == recentSearches || event.target == dropDownIcon || event.target == hourlyDropDown) {

    } else {
    recentSearches.style.display = "none";
    unitsMenu.style.display ="none";
    hourlyMenu.style.display ="none";
    }
})


