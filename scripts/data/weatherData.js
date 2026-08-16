// class declaration
export class weatherData {
// fetch weather data json
 async getWeatherData(latitude, longitude, unitTemp, unitSpeed, precipMeasure) {
    try {
    const value = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&temperature_unit=${unitTemp}&wind_speed_unit=${unitSpeed}&precipitation_unit=${precipMeasure}&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&past_days=7&current=relative_humidity_2m,temperature_2m,wind_speed_10m,precipitation`).then((response)=>{
        if (response.status >=400) {
            window.location.href ="apiFailure.html";
        }
        return response.json()
    })

    return value;
} catch(error) {
    console.log("Unexpected error. Try again later");
}
}

// fetch geo coordinates for location
async  getGeoData(params) {
    try {
    const value = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${params}&count=1&language=en&format=json`).then((response)=>{
      
        if (response.status >=400) {
            window.location.href ="apiFailure.html";
        }
        return response.json()
    })
    return value;
} catch(error) {
    console.log("Unexpected error. Try again later")
}
}

// fetch geo coordinates for location currently typed in search bar
async getGeoDataSearch(params) {
    try {
    const value = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${params}&count=4&language=en&format=json`).then((response)=>{
        return response.json()
    })
    return value;
} catch(error) {
    console.log("Unexpected error. Try again later")
}
}

// retreive geo coordinates
async retrieveCoordinates(searchValue) {
  
    try {
   const result=  await this.getGeoData(searchValue);
   
 if (result.results == undefined) {
    window.location.href ="noResults.html";
 }
   return result;
    } catch(error) {
        console.log("Unexpected error. Try again later")
    }

}
}


