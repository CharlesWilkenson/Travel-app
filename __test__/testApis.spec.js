/**
 * @jest-environment jsdom
 */
import {checkDateValidity} from '../src/client/js/app.js';
import {getImageFromPixabayAPI, callGeonamesAPI, getWeatherFromWeatherBit, getDataFromGeonamesdAPI} from '../src/server/middleware/externalAPIs.js';



// describe("GET /image from pixabay api", () => {
//     it("should return the type", async () => {
//         const input = {city: 'Miami'};
//         const expected = "photo";
//
//         const result = await getImageFromPixabayAPI(input);
//         expect(result.image_url).not.toBeNull();
//         //expect(response).toBe(200)
//     })
// })
//
//
// describe("GET /get infos from geonames api", () => {
//     it("should return the infos from this api", async () => {
//
//         const input = 'Italia';
//
//         const expectedCountry = "Italy";
//         const expectedLng = '12.83333';
//         const expectedLat = '42.83333'
//
//         const result = await callGeonamesAPI(input);
//         expect(result.country).toEqual(expectedCountry);
//         expect(result.lng).toEqual(expectedLng);
//         expect(result.lat).toEqual(expectedLat);
//     })
// })


test('Should return the same as input', () => {
    const input = {
        "city": "New York",
        "country": "USA",
        "lng": 23223244.2,
        "lat": 434332214
    }
    const output = {
        "city": "New York",
        "country": "USA",
        "lng": 23223244.2,
        "lat": 434332214
    };
    expect(getDataFromGeonamesdAPI(input)).toEqual(output);
})

test('Should return weatherbit info and Geonames info', () => {

    const input = {
        highTemp: 52.3,
        lowTemp: 23.7,
        description: "High"
    }

    const output = {
        city: "New York",
        country: "USA",
        description: "High",
        highTemp: 52.3,
        lat: 434332214,
        lng: 23223244.2,
        lowTemp: 23.7,
    }

    expect(getWeatherFromWeatherBit(input)).toEqual(output);
})


test('Should how many days left', () => {
    const input = new Date()
    input.setDate(input.getDate() + 10);
    const output = 10;
    expect(checkDateValidity(input)).toEqual(output);
})


