import { getGeoData, retrieveCoordinates, getWeatherData } from "../scripts/data/weatherData.js";
describe("test suite: Getting weather data", ()=>{
    it("returns geo weather",  async ()=>{
async function  getBerlinData() {
    const value = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=52.5244&longitude=13.4105&hourly=temperature_2m`).then((response)=>{
        return response.json()
    })
    return value;
    
}
async function myCode() {
    const searchValue = "Berlin";
         const geoCoordinates = await  retrieveCoordinates(searchValue);
    const weatherLocationData = await getWeatherData(geoCoordinates.results[0].latitude, geoCoordinates.results[0].longitude);
  return weatherLocationData;
}
const berlinData = await getBerlinData();
const myCodeData = await myCode();
expect(berlinData.latitude).toEqual(myCodeData.latitude);
expect(berlinData.longitude).toEqual(myCodeData.longitude);
    })
})