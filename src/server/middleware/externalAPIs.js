import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const weatherBitBaseURL = "https://api.weatherbit.io/v2.0/forecast/daily";
const pixabayBaseURL = "http://pixabay.com/api";
const geonamesBaseURL = "http://api.geonames.org/searchJSON";
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

let trip = {};


let getDataFromGeonamesdAPI = (dataFromGeonamesdAPI) => {
    trip = {
        "city": dataFromGeonamesdAPI.city,
        "country": dataFromGeonamesdAPI.country,
        "lng": dataFromGeonamesdAPI.lng,
        "lat": dataFromGeonamesdAPI.lat
    }
    return trip;
}

let getWeatherFromWeatherBit = (wheater) => {
    trip['highTemp'] = wheater.highTemp;
    trip['lowTemp'] = wheater.lowTemp;
    trip['description'] = wheater.description;
    return trip;
}

export const callGeonamesAPI = async (city) => {
    const username = process.env.GEONAME_API_USERNAME;
    const geonamesURL = `${geonamesBaseURL}?q=${city}&username=${username}&maxRows=1`;
    try {
        const response = await fetch(geonamesURL);
        const newData = await response.json();

        let data = {
            city: city,
            country: newData.geonames[0].countryName,
            lng: newData.geonames[0].lng,
            lat: newData.geonames[0].lat
        }
        return getDataFromGeonamesdAPI(data);
    } catch (error) {
        console.log(error);
    }
}


export const getWeather = async (data = {}) => {
    let city = data.city;
    let country = data.country;
    let lng = data.lng;
    let lat = data.lat;

    let weatherBitURL = `${weatherBitBaseURL}?key=${encodeURIComponent(WEATHERBIT_API_KEY)}&lat=${lat}&lon=${encodeURIComponent(lng)}&city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}`;

    try {
        const response = await fetch(weatherBitURL);
        const newData = await response.json();

        let data = {
            highTemp: newData.data[0].high_temp,
            lowTemp: newData.data[0].low_temp,
            description: newData.data[0].weather.description
        }
        return getWeatherFromWeatherBit(data);
    } catch (error) {
        console.log(error);
    }
}

export const getImageFromPixabayAPI = async (data = {}) => {

    let city = data.city;
    let URL = `${pixabayBaseURL}?key=${PIXABAY_API_KEY}&q=${city}&image_type=photo`;

    try {
        const response = await fetch(URL);
        const newData = await response.json();
        trip['image_url'] = newData.hits[0].webformatURL;
        return trip;
    } catch (err) {
        console.log(err);
    }
}

export const callAPIs = async (city) => {
    return await callGeonamesAPI(city)
        .then((data) => {
            return getWeather(data)
        })
        .then((data) => {
            return getImageFromPixabayAPI(data);
        });
}
