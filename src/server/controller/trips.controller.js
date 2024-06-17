import {
  InvalidDateError,
  ResourceNotFoundError,
  AllFieldsRequiredError
} from "../error/customErrors.js";

import {
  callGeonamesAPI,
  getWeather,
  getImageFromPixabayAPI,
  trip

} from '../middleware/externalAPIs.js';

import {connection} from '../db/connect.js';
const geonamesBaseURL = "http://api.geonames.org/searchJSON";

/**
 * @description add trip
 * @route POST /trips
 */

export const addTrip = async function (req, res) {
  const city = req.body.city;
  const departing = req.body.departing;
  const username = "wilki";
  const geonamesURL = `${geonamesBaseURL}?q=${city}&username=${username}&maxRows=1`;

  let countDown = (new Date(departing) - new Date()) / (1000 * 60 * 60 * 24);
      
  try {
    if (countDown <= 0) throw new InvalidDateError("You cannot add an earlier date", 400);
    
    await callGeonamesAPI(geonamesURL)
      .then(data => {
        trip['departing'] = departing;
        return data;
      }).then(data => {
        return getWeather(data);
      })
      .then(data => {
        return getImageFromPixabayAPI(data);
      }).then(() => {
        insertTrip(trip);
        console.log("NEW TRIP ", trip);
        const response = createResponse("New trip has been added", 201);
        res.send(response)
      });

  } catch (err) {
    if (err instanceof InvalidDateError) res.send(createResponse(err.message,  err.statusCode));
        else res.send(createResponse("Failed to add new trip", 500 ))
                };
  };

/**
 * @description add trip
 * @route POST /trips
 */
export const insertTrip = async (trip = {}) => {
    let sql = "INSERT INTO trip (city, country, highTemp, lowTemp, description, departing, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)";
  try {
    if (!trip.city || !trip.country || !trip.highTemp || !trip.lowTemp || !trip.description || !trip.departing || !trip.image_url)
    throw new AllFieldsRequiredError(createCustomError("All fields are required", 400))

   await connection.query(sql, [trip.city, trip.country, trip.highTemp, trip.lowTemp, trip.description, trip.departing, trip.image_url]);
  } catch (err) {
  }

};



/**
 * @returns trip object
 */
async function getTrip(id) {
  let sql = "SELECT * FROM trip WHERE id = ?";
  const [rows] = await connection.query(sql, [id]);
  return rows[0];
}


/**
 * @returns calculate the number of days remain
 */
let calculateRemainingDays = (trips = []) => {
  for (const element of trips) { 
        let countDown = (new Date(element.departing) - new Date()) / (1000 * 60 * 60 * 24);
        element['countDown'] = Math.trunc(countDown);
    }
}


/**
 * @returns trips array object 
 */
async function getTrips() { 

  const sql = "SELECT * from trip";
  const [rows] = await connection.query(sql);
  if (!rows.length) {
    let trips = [mockData];
    // return res.status(204).json({ message: "empty list" });
    calculateRemainingDays(trips);
     return trips;
  }
  calculateRemainingDays(rows);
  return rows;
}

 
/**
 * @description Get Single trip
 * @route GET /trips/:id
 */
export const getSingleTrip = async (req, res) =>{
  const { id } = req.params;
  try {
    const trip = await getTrip(id);
  if (!trip)  throw new  ResourceNotFoundError("Trip not found", 404);
  return res.status(200).json(trip);
  } catch (err) {
        if (err instanceof ResourceNotFoundError) res.send(createResponse(err.message, err.statusCode))
}
};


/**
 * @description Get All trip
 * @route GET /trips
 */
export const getAllTrips = async (req, res, next) =>{
  const rows = await getTrips();
  res.render('index', { trips: rows });
 //return res.status(200).json({ trips: rows });
};



/**
 * @description Delete note
 * @route DELETE /trips/:id
 */
export const deleteTrip = async (req, res) => {
  console.log("Method called " ,req.params)
  let sql = "DELETE FROM trip WHERE id = ?";
  const { id } = req.params;

  try {
    if (!trip) throw new ResourceNotFoundError("Trip not found", 404);
    await connection.query(sql, [id]);
    let response = createResponse("Trip has been deleted successfully", 201);
    res.send(response);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) res.send(createResponse(err.message,  err.statusCode))
    else res.send(createResponse("Failed to delete this trip", err.statusCode))
    console.log(err)
}
};


   const mockData ={
      city: "...........",
      country: "...........",
      highTemp : "......",
      lowTemp : ".....",
      description : "..........................",
      departing: "0000-00-00",
      image_url: 'https://statics.vinwonders.com/international-travel-0_1684823087.jpg',
      size: 0
}
       
const createResponse = (message, statusCode)=>{
   const response = {
    statusCode: statusCode,
    message: message
  }
  return response;
}