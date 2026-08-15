// fetch weather data json
export async function  getWeatherData(latitude, longitude, unitTemp, unitSpeed, precipMeasure) {
    try {
        console.log(unitTemp)
        console.log(unitSpeed)
        console.log(precipMeasure)
    const value = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&temperature_unit=${unitTemp}&wind_speed_unit=${unitSpeed}&precipitation_unit=${precipMeasure}&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&past_days=7&current=relative_humidity_2m,temperature_2m,wind_speed_10m,precipitation`).then((response)=>{
        return response.json()
    })

    return value;
} catch(error) {
    console.log("Unexpected error. Try again later");
}
}

// fetch geo coordinates for location
export async function  getGeoData(params) {
    try {
    const value = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${params}&count=1&language=en&format=json`).then((response)=>{
        return response.json()
    })
    return value;
} catch(error) {
    console.log("Unexpected error. Try again later")
}
}

// fetch geo coordinates for location currently typed in search bar
export async function  getGeoDataSearch(params) {
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
export async function retrieveCoordinates(searchValue) {
  
    try {
   const result=  await getGeoData(searchValue);
   
   console.log(result);
   return result;
    } catch(error) {
        console.log("Unexpected error. Try again later")
    }

}