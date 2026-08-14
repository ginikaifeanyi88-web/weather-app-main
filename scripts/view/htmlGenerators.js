// Match weather code to icon
export function findWeatherCode(weatherCode) {
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

// generate html for hourly forecast
export function generateHourlyHTML(hourlyTemps, hourlyCodes, startingPoint) {
    let hourlHTML = ``;
    for (let j=startingPoint;j<startingPoint+24;j++) {
        let specificHour = "";
        if (j == startingPoint) {
            specificHour = "0 AM"
        } else if (j == startingPoint+12) {
            specificHour = "12 PM"
        } else if (j > startingPoint && j < startingPoint+12) {
            specificHour=  (j-startingPoint) + " AM";
        } else if (j > startingPoint+ 12) {
            specificHour = (j-(startingPoint+12))+ " PM";
        }
        hourlHTML += `  <div class="hourly-forecast-item">
    <img src="assets/images/${findWeatherCode(hourlyCodes[j])}.webp" alt="hourly-forecast-img">
    <p class="hour-of-day">${specificHour}</p>
    <p class="hourly-temp">${Math.round(hourlyTemps[j])}°</p>
  </div>`;
    }
    return hourlHTML;
}

// generate hourly html after clicking a day

export function generateHourlyAfterHtml(dayChosen, weatherData, today) {
    let hourlyTempArray;
let weatherCodeArray;
    let htmlGenerated = ''
    if (today.format("dddd") == "Monday") {
            hourlyTempArray = weatherData.hourly.temperature_2m.slice(168, 336);
            weatherCodeArray = weatherData.hourly.weather_code.slice(168, 336);
            console.log(hourlyTempArray);
        } else if (today.format("dddd") == "Tuesday") {
            hourlyTempArray = weatherData.hourly.temperature_2m.slice(144, (144+168));
            weatherCodeArray = weatherData.hourly.weather_code.slice(144, (144+168));
            console.log(hourlyTempArray);
        } else if (today.format("dddd") == "Wednesday") {
             hourlyTempArray = weatherData.hourly.temperature_2m.slice(120, (120+168));
             weatherCodeArray = weatherData.hourly.weather_code.slice(120, (120+168));
            console.log(hourlyTempArray);
        } else if  (today.format("dddd") == "Thursday") {
            hourlyTempArray = weatherData.hourly.temperature_2m.slice(96, (96+168));
            weatherCodeArray = weatherData.hourly.weather_code.slice(96, (96+168));
            console.log(hourlyTempArray);
            console.log(weatherCodeArray);
        } else if  (today.format("dddd") == "Friday") {
            hourlyTempArray = weatherData.hourly.temperature_2m.slice(72, (72+168));
            weatherCodeArray = weatherData.hourly.weather_code.slice(72, (72+168));
            console.log(hourlyTempArray);
        } else if (today.format("dddd") == "Saturday")  {
            hourlyTempArray = weatherData.hourly.temperature_2m.slice(48, (48+168));
            weatherCodeArray = weatherData.hourly.weather_code.slice(48, (48+168));
            console.log(hourlyTempArray);
        } else if  (today.format("dddd") == "Sunday")  {
            hourlyTempArray = weatherData.hourly.temperature_2m.slice(24, (24+168));
            weatherCodeArray = weatherData.hourly.weather_code.slice(24, (24+168));
            console.log(hourlyTempArray);
        }

         if (dayChosen=="Monday") {
                    htmlGenerated = generateHourlyHTML(hourlyTempArray, weatherCodeArray, 0);
                } else if (dayChosen =="Tuesday"){
                    htmlGenerated= generateHourlyHTML(hourlyTempArray, weatherCodeArray, 24);
                } else if  (dayChosen =="Wednesday"){
                    htmlGenerated= generateHourlyHTML(hourlyTempArray, weatherCodeArray, 48);
                } else if (dayChosen=="Thursday"){
                    htmlGenerated = generateHourlyHTML(hourlyTempArray, weatherCodeArray, 72);
                } else if (dayChosen=="Friday") {
                    htmlGenerated = generateHourlyHTML(hourlyTempArray, weatherCodeArray, 96);
                } else if (dayChosen=="Saturday") {
                    htmlGenerated = generateHourlyHTML(hourlyTempArray, weatherCodeArray, 120);
                } else if  (dayChosen="Sunday") {
                    htmlGenerated = generateHourlyHTML(hourlyTempArray, weatherCodeArray, 144);
                } 

    return htmlGenerated;
}

// generate html for daily forecast
export function generateDailyHTML(dailyMaxTemps, dailyMinTemps, theWeatherCode, today) {
    let dailyForecastHTML = ''
     for (let i=7;i<14;i++) {
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
        return dailyForecastHTML;
}

// return status of units in local storage to add specific styles
export function returnWindSpeedStatus(selectedSpeed) {
    let windSpeedMilesCheckValue;
    let windSpeedKmCheckValue;
    let currentSpeedUnitValue;
       if (selectedSpeed == "kmh") {
        windSpeedMilesCheckValue ="hidden";
    windSpeedKmCheckValue="visible";
        currentSpeedUnitValue = "km/h";
     } else if (selectedSpeed == "mph") {
     windSpeedMilesCheckValue ="visible";
    windSpeedKmCheckValue="hidden";
        currentSpeedUnitValue = "mph";
     }
     return [windSpeedKmCheckValue, windSpeedMilesCheckValue, currentSpeedUnitValue];
}

export function returnPrecipitationStatus(selectedPrecip) {
    let precipMMCheckValue;
    let precipInchCheckValue;
    let currentPrecipValue;
       if (selectedPrecip == "mm") {
        precipMMCheckValue ="visible";
    precipInchCheckValue ="hidden";
        currentPrecipValue = "mm";
     } else if (selectedPrecip == "inch") {
        precipMMCheckValue ="hidden";
    precipInchCheckValue ="visible";
        currentPrecipValue = "in";
     } 
     return [precipMMCheckValue, precipInchCheckValue, currentPrecipValue];
}

export function returnTempStatus(selectedTemp) {
    let tempUnitCheckValue;
    let tempUnitCheckFarenheitValue;
    if (selectedTemp == "celsius") {
        tempUnitCheckValue="visible";
    tempUnitCheckFarenheitValue="hidden";
     } else if (selectedTemp == "fahrenheit") {
       tempUnitCheckValue="hidden";
    tempUnitCheckFarenheitValue="visible";
     } 
     return [tempUnitCheckValue, tempUnitCheckFarenheitValue];
}