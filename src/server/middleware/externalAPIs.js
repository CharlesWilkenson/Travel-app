import dotenv from 'dotenv';
//import fetch from 'node-fetch';
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
dotenv.config();

const weatherBitBaseURL = "https://api.weatherbit.io/v2.0/forecast/daily";
const pixabayBaseURL = "http://pixabay.com/api";
const geonamesBaseURL = "http://api.geonames.org/searchJSON";
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

//App data
let trip = {};

export let getDataFromGeonamesdAPI = (data) => {
    trip = {
        "city": data.city,
        "country": data.country,
        "lng": data.lng,
        "lat": data.lat
    }
    return trip;
}

export let getWeatherFromWeatherBit = (data) => {
    trip['highTemp'] = data.highTemp;
    trip['lowTemp'] = data.lowTemp;
    trip['description'] = data.description;
    return trip;
}

/**
 * @description call geonames api to get the longitude and the latitude
 */
export const callGeonamesAPI = async (city) => {
    const username = process.env.GEONAME_API_USERNAME;
    const geonamesURL = `${geonamesBaseURL}?q=${encodeURIComponent(city)}&username=${encodeURIComponent(username)}&maxRows=1`;

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

/**
 * @description hit weatherbit api to get the weather info.
 */
export const getWeather = async (data = {}) => {
    let city = data.city;
    let country = data.country;
    let lng = data.lng;
    let lat = data.lat;

    let weatherBitURL = `${weatherBitBaseURL}?key=${encodeURIComponent(WEATHERBIT_API_KEY)}&lat=${lat}&lon=${encodeURIComponent(lng)}&city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}`;
console.log(weatherBitURL)
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

/**
 * @description call pixabay api to fetch the image
 */
export const getImageFromPixabayAPI = async (city) => {
    let URL = `${pixabayBaseURL}?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(city)}&image_type=photo`;

    try {
        const response = await fetch(URL);
        const newData = await response.json();
        trip['image_url'] = newData.hits[0].webformatURL;
        console.log(trip)
        return trip;
    } catch (err) {
        console.log(err);
    }
}

/**
 * @description chain APIs
 */
export const callAPIs = async (city) => {
    return await callGeonamesAPI(city)
        .then((data) => {
            return getWeather(data)
        })
        .then((data) => {
            return getImageFromPixabayAPI(city);
        });
}
