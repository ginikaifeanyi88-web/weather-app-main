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

// data loading variables
  let weatherLocationData = {};
  let geoCoordinates = {};

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
    recentSearches.innerHTML = htmlGeneratorObject.returnSearchOptionContainersLoadState();
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
  localStorage.setItem("lastLocationSearched", (geoCoordinates.results[0].name + ", " + geoCoordinates.results[0].admin1 + ", "+ geoCoordinates.results[0].country));
  console.log(weatherLocationData);
        recentSearches.style.display = "none";
        window.location.href ="index.html";
        
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
  localStorage.setItem("lastLocationSearched", (geoCoordinates.results[0].name + ", " + geoCoordinates.results[0].admin1 + ", "+ geoCoordinates.results[0].country));
  console.log(weatherLocationData);
   window.location.href ="index.html";
}
})

searchButton.addEventListener("click", async ()=>{
    const searchValue = searchBar.value;
    let selectedTemp = localStorage.getItem("selectedTemp");
    let selectedSpeed = localStorage.getItem("selectedSpeed");
    let selectedPrecip =  localStorage.getItem("selectedPrecip");
    console.log("this is")
    geoCoordinates = await  weatherDataObject.retrieveCoordinates(searchValue);
    weatherLocationData = await weatherDataObject.getWeatherData(geoCoordinates.results[0].latitude, geoCoordinates.results[0].longitude, selectedTemp, selectedSpeed, selectedPrecip);
    localStorage.setItem("lastLocationSearched", (geoCoordinates.results[0].name + ", " + geoCoordinates.results[0].admin1 + ", "+ geoCoordinates.results[0].country));
  console.log(weatherLocationData);
 window.location.href ="index.html";
})

// body event listener
const body = document.querySelector("body");
body.addEventListener("click", (event)=>{
    if (event.target ==  searchBar || event.target == recentSearches) {

    } else {
    recentSearches.style.display = "none";
    console.log("???");
    // unitsMenu.style.display ="none";
    // hourlyMenu.style.display ="none";
    }
})