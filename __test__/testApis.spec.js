/**
 * @jest-environment jsdom
 */
import dotenv from 'dotenv';

dotenv.config();
import {getImageFromPixabayAPI, callGeonamesAPI, getWeather} from '../src/server/middleware/externalAPIs.js';
import {checkDateValidity} from '../src/client/js/app.js';


describe("GET /image from pixabay api", () => {
    it("should return the type", async () => {
        const input = {city: 'Miami'};
        const expected = "photo";

        const result = await getImageFromPixabayAPI(input);
        expect(result.image_url).not.toBeNull();
        //expect(response).toBe(200)
    })
})


describe("GET /get infos from geonames api", () => {
    it("should return the infos from this api", async () => {

        const input = 'Italia';

        const expectedCountry = "Italy";
        const expectedLng = '12.83333';
        const expectedLat = '42.83333'

        const result = await callGeonamesAPI(input);
        expect(result.country).toEqual(expectedCountry);
        expect(result.lng).toEqual(expectedLng);
        expect(result.lat).toEqual(expectedLat);
    })
})

test('Should how many days left', () => {
    const input = new Date()
    input.setDate(input.getDate() + 10);
    const output = 10;
    expect(checkDateValidity(input)).toEqual(output);
})


