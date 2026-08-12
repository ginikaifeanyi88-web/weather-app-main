export async function  getWeatherData(params) {
    const value = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m').then((response)=>{
        return response.json()
    })
    return value;
}

export async function  getGeoData(params) {
    const value = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${params}&count=1&language=en&format=json`).then((response)=>{
        return response.json()
    })
    return value;
}

export async function retrieveCoordinates(searchValue) {
  
   const result=  await getGeoData(searchValue);
   
   console.log(result);
}