export async function  getWeatherData(latitude, longitude) {
    try {
    const value = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&current=relative_humidity_2m,temperature_2m,wind_speed_10m,precipitation`).then((response)=>{
        return response.json()
    })

    return value;
} catch(error) {
    console.log("Unexpected error. Try again later");
}
}

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

export async function retrieveCoordinates(searchValue) {
  
    try {
   const result=  await getGeoData(searchValue);
   
   console.log(result);
   return result;
    } catch(error) {
        console.log("Unexpected error. Try again later")
    }

}