// imports
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { Dropdown} from "./utilities/dropDown.js";
import { isAlphaOrComma } from './utilities/otherUtilites.js';
 import { weatherData } from "./data/weatherData.js";
 import { htmlGeneratorsClass} from './view/htmlGenerators.js';

 // class object declarations
 const dropDown = new Dropdown();
const weatherDataObject = new weatherData();
const htmlGeneratorObject = new htmlGeneratorsClass();

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


// load data to  page
const mainLocation = document.querySelector(".location");
const dateContainer = document.querySelector(".date");
const currentTemp = document.querySelector(".temp");
const currentIcon = document.querySelector(".weather-symbol");
const feelsLike = document.querySelector(".js-current-temp");
const currentHumidity = document.querySelector(".js-current-humidity");
const currentPrecipitation =document.querySelector(".js-current-precipitation");
const currentPrecipUnit = document.querySelector(".js-current-precip-unit");
const currentWindSpeed = document.querySelector(".js-current-wind-speed");
const currentSpeedUnit = document.querySelector(".js-current-speed-unit");
const dailyItems = document.querySelector(".daily-forecast-items");
const hourlyItems = document.querySelector(".hourly-forecast-items");

const tempUnitCheck = document.querySelector(".js-temp-celsius-check");
const tempUnitCheckFarenheit = document.querySelector(".js-temp-fahrenheit-check");
const windSpeedUnitKmCheck = document.querySelector(".js-speed-km-check");
const windSpeedUnitMilesCheck = document.querySelector(".js-speed-miles-check");
const precipMMCheck = document.querySelector(".js-precip-mm-check");
const precipInchCheck = document.querySelector(".js-precip-inch-check");

const dayChose = document.querySelector(".hourly-day-chose");
const today = dayjs();
dayChose.innerHTML = today.format("dddd");
dateContainer.innerHTML = today.format('dddd, MMMM D YYYY');

function loadDataToView(geoCoordinatesInput, weatherDataInput) {
    mainLocation.innerHTML = geoCoordinatesInput.results[0].name + " (" + geoCoordinatesInput.results[0].admin1 + "), "+ geoCoordinatesInput.results[0].country;
    console.log(geoCoordinatesInput.results[0].name)
    localStorage.setItem("lastLocationSearched", (geoCoordinatesInput.results[0].name + ", " + geoCoordinatesInput.results[0].admin1 + ", "+ geoCoordinatesInput.results[0].country));
    currentTemp.innerHTML =Math.round(weatherDataInput.daily.temperature_2m_max[7])+"°";
    currentIcon.setAttribute("src", `/assets/images/${htmlGeneratorObject.findWeatherCode(weatherDataInput.daily.weather_code[7])}.webp`);
    feelsLike.innerHTML = Math.round(weatherDataInput.current.temperature_2m)+"°";
    currentHumidity.innerHTML = Math.round(weatherDataInput.current.relative_humidity_2m) + "%";
    currentWindSpeed.innerHTML = Math.round(weatherDataInput.current.wind_speed_10m);
     let selectedSpeed = localStorage.getItem("selectedSpeed");
        windSpeedUnitMilesCheck.style.visibility= htmlGeneratorObject.returnWindSpeedStatus(selectedSpeed)[1];
    windSpeedUnitKmCheck.style.visibility= htmlGeneratorObject.returnWindSpeedStatus(selectedSpeed)[0];
        currentSpeedUnit.innerHTML = htmlGeneratorObject.returnWindSpeedStatus(selectedSpeed)[2];
   
    currentPrecipitation.innerHTML = Math.round(weatherDataInput.current.precipitation);
       let selectedPrecip =  localStorage.getItem("selectedPrecip");
        precipMMCheck.style.visibility =htmlGeneratorObject.returnPrecipitationStatus(selectedPrecip)[0];
    precipInchCheck.style.visibility =htmlGeneratorObject.returnPrecipitationStatus(selectedPrecip)[1];
        currentPrecipUnit.innerHTML = htmlGeneratorObject.returnPrecipitationStatus(selectedPrecip)[2];
 
    const dailyMaxTemps = weatherDataInput.daily.temperature_2m_max;
     const dailyMinTemps = weatherDataInput.daily.temperature_2m_min;
     const theWeatherCode = weatherDataInput.daily.weather_code;
    const hourlyTemps = weatherDataInput.hourly.temperature_2m;
     let selectedTemp = localStorage.getItem("selectedTemp");
        tempUnitCheck.style.visibility=htmlGeneratorObject.returnTempStatus(selectedTemp)[0];
    tempUnitCheckFarenheit.style.visibility=htmlGeneratorObject.returnTempStatus(selectedTemp)[1];
    
    const hourlyCodes = weatherDataInput.hourly.weather_code;
     hourlyItems.innerHTML = htmlGeneratorObject.generateHourlyHTML(hourlyTemps, hourlyCodes, 168);
    dailyItems.innerHTML = htmlGeneratorObject.generateDailyHTML(dailyMaxTemps,dailyMinTemps,theWeatherCode,today);
}

// Initial data loading
const imperialMetric = document.querySelector(".js-imperial-metric");
  let weatherLocationData = {};
  let geoCoordinates = {};
async function initialDataLoad() {
    let lastLocationSearched = localStorage.getItem("lastLocationSearched");
     let selectedTemp = localStorage.getItem("selectedTemp");
   let  selectedSpeed = localStorage.getItem("selectedSpeed");
     let  selectedPrecip =  localStorage.getItem("selectedPrecip");
     if (!lastLocationSearched) {
        lastLocationSearched = "New York";
     }
     if (!selectedTemp){
        selectedTemp="celsius";
        localStorage.setItem("selectedTemp", "celsius");
     }
      if (!selectedSpeed){
        selectedSpeed="kmh";
         localStorage.setItem("selectedSpeed", "kmh");
     }
     if (!selectedPrecip){
        selectedPrecip="mm";
        localStorage.setItem("selectedPrecip", "mm");
     }
     if (selectedTemp=="celsius"&&selectedSpeed=="kmh"&&selectedPrecip=="mm") {
        imperialMetric.innerHTML = "Switch to Imperial";
     } else if (selectedTemp=="fahrenheit"&&selectedSpeed=="mph"&&selectedPrecip=="inch") {
         imperialMetric.innerHTML = "Switch to Metric";
     } else {
        imperialMetric.innerHTML = "Switch to Imperial";
     }
     geoCoordinates = await  weatherDataObject.retrieveCoordinates(lastLocationSearched);
     console.log(selectedTemp);
     weatherLocationData = await weatherDataObject.getWeatherData(geoCoordinates.results[0].latitude, geoCoordinates.results[0].longitude, selectedTemp, selectedSpeed, selectedPrecip);
     loadDataToView(geoCoordinates, weatherLocationData);
     precipMMCheck.style.visibility =htmlGeneratorObject.returnPrecipitationStatus(selectedPrecip)[0];
    precipInchCheck.style.visibility =htmlGeneratorObject.returnPrecipitationStatus(selectedPrecip)[1];
        currentPrecipUnit.innerHTML = htmlGeneratorObject.returnPrecipitationStatus(selectedPrecip)[2];
         tempUnitCheck.style.visibility=htmlGeneratorObject.returnTempStatus(selectedTemp)[0];
    tempUnitCheckFarenheit.style.visibility=htmlGeneratorObject.returnTempStatus(selectedTemp)[1];
    windSpeedUnitMilesCheck.style.visibility= htmlGeneratorObject.returnWindSpeedStatus(selectedSpeed)[1];
    windSpeedUnitKmCheck.style.visibility= htmlGeneratorObject.returnWindSpeedStatus(selectedSpeed)[0];
        currentSpeedUnit.innerHTML = htmlGeneratorObject.returnWindSpeedStatus(selectedSpeed)[2];
}

initialDataLoad();

// search bar functionaluity
const searchBar = document.querySelector("#search-bar");
const recentSearches = document.querySelector(".recent-searches");
const searchButton = document.querySelector("#search-button");


searchBar.addEventListener("click", ()=>{
    dropDown.isStillFocusing(searchBar, recentSearches);
})

let recentSearchOptions = document.querySelectorAll(".recent-search");
recentSearchOptions.forEach((recentSearchOption)=>{
    recentSearchOption.addEventListener("click", ()=>{
        console.log("scooby dooby doo");
        recentSearches.style.display = "none";
    })
})

searchBar.addEventListener("keydown", async (event)=>{
    const searchValue = searchBar.value;
    let selectedTemp = localStorage.getItem("selectedTemp");
    let selectedSpeed = localStorage.getItem("selectedSpeed");
     let selectedPrecip =  localStorage.getItem("selectedPrecip");
if ((event.code !== "Enter") && (searchValue.length > 1) &&(isAlphaOrComma(searchValue))) {
   let geoCoordinatesSearchInitial = await  weatherDataObject.getGeoDataSearch(searchValue);
   let geoCoordinatesSearch = geoCoordinatesSearchInitial.results.filter((geoResult)=>{
    if (geoResult.admin1 !== undefined) {
        return  geoResult;
    }
    
   })
   console.log(geoCoordinatesSearch);
  
     recentSearches.innerHTML= htmlGeneratorObject.returnSearchOptionContainers(geoCoordinatesSearch);
   
   recentSearchOptions = document.querySelectorAll(".recent-search");
    let l = 0;
   recentSearchOptions.forEach((recentSearchOption)=>{
    recentSearchOption.innerHTML = geoCoordinatesSearch[l].name + ", "+ geoCoordinatesSearch[l].admin1 + ", "+ geoCoordinatesSearch[l].country;
    l++;
    
   })
   recentSearches.style.display ="block";
   recentSearchOptions.forEach((recentSearchOption)=>{
    recentSearchOption.addEventListener("click", async ()=>{
          geoCoordinates = await  weatherDataObject.retrieveCoordinates(recentSearchOption.innerHTML);
  weatherLocationData = await weatherDataObject.getWeatherData(geoCoordinates.results[0].latitude, geoCoordinates.results[0].longitude, selectedTemp, selectedSpeed, selectedPrecip);
  console.log(weatherLocationData);
    loadDataToView(geoCoordinates, weatherLocationData);
        recentSearches.style.display = "none";
        
    })
})
}
})

searchBar.addEventListener("keydown", async (event)=>{
    const searchValue = searchBar.value;
    let selectedTemp = localStorage.getItem("selectedTemp");
    let selectedSpeed = localStorage.getItem("selectedSpeed");
    let selectedPrecip =  localStorage.getItem("selectedPrecip");
if (event.code == "Enter") {
    console.log("hi");
  geoCoordinates = await  weatherDataObject.retrieveCoordinates(searchValue);
  weatherLocationData = await weatherDataObject.getWeatherData(geoCoordinates.results[0].latitude, geoCoordinates.results[0].longitude, selectedTemp, selectedSpeed, selectedPrecip);
  console.log(weatherLocationData);
    loadDataToView(geoCoordinates, weatherLocationData);
}
})

searchButton.addEventListener("click", async ()=>{
    const searchValue = searchBar.value;
    let selectedTemp = localStorage.getItem("selectedTemp");
    let selectedSpeed = localStorage.getItem("selectedSpeed");
    let selectedPrecip =  localStorage.getItem("selectedPrecip");
    console.log("this is")
     const geoCoordinates = await  weatherDataObject.retrieveCoordinates(searchValue);
    weatherLocationData = await weatherDataObject.getWeatherData(geoCoordinates.results[0].latitude, geoCoordinates.results[0].longitude, selectedTemp, selectedSpeed, selectedPrecip);
  console.log(weatherLocationData);
  loadDataToView(geoCoordinates, weatherLocationData);
})

// day choice event listener
for (let k=0;k<7;k++) {
    hourlyChoices[k].addEventListener("click", ()=>{
        let dayClicked = today.day(k+1)
        dayChose.innerHTML = dayClicked.format("dddd");
         hourlyItems.innerHTML = htmlGeneratorObject.generateHourlyAfterHtml(dayChose.innerHTML,weatherLocationData,today);
    })
}

// body event listener
const body = document.querySelector("body");
body.addEventListener("click", (event)=>{
    if (event.target ==  searchBar || event.target == recentSearches || event.target == dropDownIcon || event.target == hourlyDropDown) {

    } else {
    recentSearches.style.display = "none";
    console.log("???");
    unitsMenu.style.display ="none";
    hourlyMenu.style.display ="none";
    }
})

// units event listeners
const tempUnit = document.querySelector(".js-temp-celsius");
const tempUnitFahrenheit = document.querySelector(".js-temp-fahrenheit");
const windSpeedUnitKm = document.querySelector(".js-speed-km");
const windSpeedUnitMiles= document.querySelector(".js-speed-miles");
const precipMM = document.querySelector(".js-precip-mm");
const precipInch = document.querySelector(".js-precip-inch");

tempUnit.addEventListener("click", async ()=>{
    tempUnitCheckFarenheit.style.visibility="hidden";
    tempUnitCheck.style.visibility="visible";
    localStorage.setItem("selectedTemp", "celsius");
    let selectedTemp = localStorage.getItem("selectedTemp");
    let selectedSpeed = localStorage.getItem("selectedSpeed");
     let selectedPrecip =  localStorage.getItem("selectedPrecip");
    weatherLocationData = await weatherDataObject.getWeatherData(geoCoordinates.results[0].latitude, geoCoordinates.results[0].longitude, selectedTemp, selectedSpeed, selectedPrecip);
  console.log(weatherLocationData);
    loadDataToView(geoCoordinates, weatherLocationData);

})


tempUnitFahrenheit.addEventListener("click", async ()=>{
    tempUnitCheck.style.visibility="hidden";
    tempUnitCheckFarenheit.style.visibility="visible";
    localStorage.setItem("selectedTemp", "fahrenheit");
    let selectedTemp = localStorage.getItem("selectedTemp");
    let selectedSpeed = localStorage.getItem("selectedSpeed");
     let selectedPrecip =  localStorage.getItem("selectedPrecip");
    weatherLocationData = await weatherDataObject.getWeatherData(geoCoordinates.results[0].latitude, geoCoordinates.results[0].longitude, selectedTemp, selectedSpeed, selectedPrecip);
  console.log(weatherLocationData);
    loadDataToView(geoCoordinates, weatherLocationData);

})

windSpeedUnitKm.addEventListener("click", async()=>{
    windSpeedUnitMilesCheck.style.visibility="hidden";
    windSpeedUnitKmCheck.style.visibility="visible";
    localStorage.setItem("selectedSpeed", "kmh");
    let selectedSpeed = localStorage.getItem("selectedSpeed");
      let selectedTemp = localStorage.getItem("selectedTemp");
       let selectedPrecip =  localStorage.getItem("selectedPrecip");
    weatherLocationData = await weatherDataObject.getWeatherData(geoCoordinates.results[0].latitude, geoCoordinates.results[0].longitude, selectedTemp, selectedSpeed, selectedPrecip);
  console.log(weatherLocationData);
    loadDataToView(geoCoordinates, weatherLocationData);
})

windSpeedUnitMiles.addEventListener("click", async()=>{
    windSpeedUnitKmCheck.style.visibility="hidden";
    windSpeedUnitMilesCheck.style.visibility="visible";
    localStorage.setItem("selectedSpeed", "mph");
    let selectedSpeed = localStorage.getItem("selectedSpeed");
      let selectedTemp = localStorage.getItem("selectedTemp");
       let selectedPrecip =  localStorage.getItem("selectedPrecip");
    weatherLocationData = await weatherDataObject.getWeatherData(geoCoordinates.results[0].latitude, geoCoordinates.results[0].longitude, selectedTemp, selectedSpeed, selectedPrecip);
  console.log(weatherLocationData);
    loadDataToView(geoCoordinates, weatherLocationData);
})

precipMM.addEventListener("click", async()=>{
    localStorage.setItem("selectedPrecip", "mm");
    precipInchCheck.style.visibility ="hidden";
    precipMMCheck.style.visibility ="visible";
    let selectedPrecip =  localStorage.getItem("selectedPrecip");
     let selectedSpeed = localStorage.getItem("selectedSpeed");
      let selectedTemp = localStorage.getItem("selectedTemp");
      weatherLocationData = await weatherDataObject.getWeatherData(geoCoordinates.results[0].latitude, geoCoordinates.results[0].longitude, selectedTemp, selectedSpeed, selectedPrecip);
  console.log(weatherLocationData);
    loadDataToView(geoCoordinates, weatherLocationData);
})

precipInch.addEventListener("click", async()=>{
    localStorage.setItem("selectedPrecip", "inch");
    precipMMCheck.style.visibility ="hidden";
    precipInchCheck.style.visibility ="visible";
    let selectedPrecip =  localStorage.getItem("selectedPrecip");
     let selectedSpeed = localStorage.getItem("selectedSpeed");
      let selectedTemp = localStorage.getItem("selectedTemp");
      weatherLocationData = await weatherDataObject.getWeatherData(geoCoordinates.results[0].latitude, geoCoordinates.results[0].longitude, selectedTemp, selectedSpeed, selectedPrecip);
  console.log(weatherLocationData);
    loadDataToView(geoCoordinates, weatherLocationData);
})

imperialMetric.addEventListener("click", async ()=>{
    let selectedTemp;
    let selectedSpeed;
     let selectedPrecip;
    if (imperialMetric.innerHTML=="Switch to Metric") {
    imperialMetric.innerHTML = "Switch to Imperial";
    tempUnitCheckFarenheit.style.visibility="hidden";
    tempUnitCheck.style.visibility="visible";
    localStorage.setItem("selectedTemp", "celsius");
    windSpeedUnitMilesCheck.style.visibility="hidden";
    windSpeedUnitKmCheck.style.visibility="visible";
    localStorage.setItem("selectedSpeed", "kmh");
      localStorage.setItem("selectedPrecip", "mm");
    precipInchCheck.style.visibility ="hidden";
    precipMMCheck.style.visibility ="visible";
    selectedTemp = localStorage.getItem("selectedTemp");
    selectedSpeed = localStorage.getItem("selectedSpeed");
      selectedPrecip =  localStorage.getItem("selectedPrecip");
    weatherLocationData = await weatherDataObject.getWeatherData(geoCoordinates.results[0].latitude, geoCoordinates.results[0].longitude, selectedTemp, selectedSpeed, selectedPrecip);
    } else if (imperialMetric.innerHTML=="Switch to Imperial") {
         imperialMetric.innerHTML = "Switch to Metric";
         tempUnitCheck.style.visibility="hidden";
    tempUnitCheckFarenheit.style.visibility="visible";
    localStorage.setItem("selectedTemp", "fahrenheit");
    windSpeedUnitKmCheck.style.visibility="hidden";
    windSpeedUnitMilesCheck.style.visibility="visible";
    localStorage.setItem("selectedSpeed", "mph");
 precipMMCheck.style.visibility ="hidden";
    precipInchCheck.style.visibility ="visible";
    localStorage.setItem("selectedPrecip", "inch");
    selectedTemp = localStorage.getItem("selectedTemp");
    selectedSpeed = localStorage.getItem("selectedSpeed");
     selectedPrecip =  localStorage.getItem("selectedPrecip");
     weatherLocationData = await weatherDataObject.getWeatherData(geoCoordinates.results[0].latitude, geoCoordinates.results[0].longitude, selectedTemp, selectedSpeed, selectedPrecip);
    }
     loadDataToView(geoCoordinates, weatherLocationData);
})