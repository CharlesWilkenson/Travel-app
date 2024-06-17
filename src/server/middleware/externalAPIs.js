import dotenv from 'dotenv';
dotenv.config();
const weatherBitBaseURL = "https://api.weatherbit.io/v2.0/forecast/daily";
const pixabayBaseURL = "https://pixabay.com/api";
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
export let trip = {};

 let getDataFromGeonamesdAPI = (dataFromGeonamesdAPI) => {
      trip = {
      "city": dataFromGeonamesdAPI.geonames[0].name,
      "country": dataFromGeonamesdAPI.geonames[0].countryName,
      "lng": dataFromGeonamesdAPI.geonames[0].lng,
      "lat": dataFromGeonamesdAPI.geonames[0].lat
      }
}


 let getWeatherFromWeatherBit = (wheater) => {
  trip['highTemp'] = wheater.data[0].high_temp;
  trip['lowTemp'] = wheater.data[0].low_temp;
  trip['description'] = wheater.data[0].weather.description;
}


export const callGeonamesAPI = async (url='') => { 
  try {
           const response = await fetch(url);
           const newdata = await response.json();
            getDataFromGeonamesdAPI(newdata);
            return newdata;
    } catch (error) {
        console.log(error);
     }
}


export const getWeather = async (data = {}) => {
  let city = data.geonames[0].name;
  let country = data.geonames[0].countryName;
  let lng = data.geonames[0].lng;
  let lat = data.geonames[0].lat;

  let weatherBitURL = `${weatherBitBaseURL}?key=${encodeURIComponent(WEATHERBIT_API_KEY)}&lat=${lat}&lon=${encodeURIComponent(lng)}&city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}`; 

  try {
      const response = await fetch(weatherBitURL);
    const newdata = await response.json();
      getWeatherFromWeatherBit(newdata);
         return newdata;
    } catch (error) {
        console.log(error);
     }
}

export const getImageFromPixabayAPI = async (data={}) => {
  let city = data.city_name;
  let URL = `${pixabayBaseURL}?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(city)}&image_type=photo`;

  try {
     const response = await fetch(URL);
     const newData = await response.json();
    trip['image_url'] = newData.hits[0].webformatURL;
    
    return newData;
  } catch (err) { 
    console.log(err);
  }

}