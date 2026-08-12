import { Dropdown} from "./utilities/dropDown.js";
const dropDown = new Dropdown();
 import { getGeoData, retrieveCoordinates } from "./data/weatherData.js";

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

hourlyChoices.forEach((hourlyChoice)=>{
    hourlyChoice.addEventListener("click", ()=>{
        console.log("delo")
    })
})

// search bar functionaluity

const searchBar = document.querySelector("#search-bar");

const recentSearches = document.querySelector(".recent-searches");
const searchButton = document.querySelector("#search-button")
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
  await  retrieveCoordinates(searchValue);
}
})

searchButton.addEventListener("click", async ()=>{
    const searchValue = searchBar.value;

    console.log("this is")
    await  retrieveCoordinates(searchValue);

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


