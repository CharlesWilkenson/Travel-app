import {ResourceNotFoundError} from "../error/customErrors.js";
import {callAPIs} from '../middleware/externalAPIs.js';
import {connection} from '../db/connect.js';


/**
 * @param req
 * @param res
 * @description api to call to add a new trip
 * @route POST /trips
 */
export const addTrip = async function (req, res) {
    const city = req.body.city;
    const departing = req.body.departing;
    let response = '';

    try {
        const data = await callAPIs(city)
            .then(data => {
                data['departing'] = departing;
                return data;
            });
        await insertTrip(data);
        response = createResponse("New trip has been added", 201);
        res.send(response)

    } catch (err) {
        res.send(createResponse("Failed to add new trip", 500));
    }
};

/**
 * @param trip
 * @description insert a new trip into the database
 * @route POST /trips
 */
export const insertTrip = async (trip = {}) => {
    let sql = "INSERT INTO trip (city, country, highTemp, lowTemp, description, departing, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)";
    try {
        await connection.query(sql, [trip.city, trip.country, trip.highTemp, trip.lowTemp, trip.description, trip.departing, trip.image_url]);
    } catch (err) {
        throw err;

    }
};


/**
 * @param id
 * @description fetch a single trip from database by id
 * @returns trip object
 */
async function getTrip(id) {
    let sql = "SELECT * FROM trip WHERE id = ?";
    const [rows] = await connection.query(sql, [id]);
    return rows[0];
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
    rows.forEach(date => {
        date.departing = formatDate(date.departing);
        return date;
    })
    calculateRemainingDays(rows);
    return rows;
}


/**
 * @param req
 * @param res
 * @description Get Single trip
 * @route GET /trips/:id
 */
export const getSingleTrip = async (req, res) => {
    const {id} = req.params;
    try {
        const trip = await getTrip(id);
        if (!trip) throw new ResourceNotFoundError("Trip not found", 404);
        return res.status(200).json(trip);
    } catch (err) {
        if (err instanceof ResourceNotFoundError) res.send(createResponse(err.message, 404))
    }
};


/**
 * @param req
 * @param res
 * @description Get All trip
 * @route GET /trips
 */
export const getAllTrips = async (req, res) => {
    const rows = await getTrips();
    res.render('index', {trips: rows});
    //return res.status(200).json({ trips: rows });
};


/**
 * @param req
 * @param res
 * @description Delete note
 * @route DELETE /trips/:id
 */
export const deleteTrip = async (req, res) => {
    let sql = "DELETE FROM trip WHERE id = ?";
    const {id} = req.params;

    try {
        const trip = await getTrip(id);
        if (!trip) throw new ResourceNotFoundError("Trip not found", 404);
        await connection.query(sql, [id]);
        let response = createResponse("Trip has been deleted successfully", 201);
        res.send(response);
    } catch (err) {
        if (err instanceof ResourceNotFoundError) res.send(createResponse(err.message, err.statusCode))
        else res.send(createResponse("Failed to delete this trip", 500))
        console.log(err)
    }
};

/**
 * @description mock data for api response in case no trip hasn't yet added
 */
const mockData = {
    city: "...........",
    country: "...........",
    highTemp: "......",
    lowTemp: ".....",
    description: "..........................",
    departing: "0000-00-00",
    image_url: 'https://statics.vinwonders.com/international-travel-0_1684823087.jpg',
    size: 0
}

/**
 * @param message
 * @param statusCode
 * @description create api response
 */
const createResponse = (message, statusCode) => {
    return {
        statusCode: statusCode,
        message: message
    };
}

/**
 * @param date
 * @description format the date
 */
const formatDate = (date) => {
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    return date.toLocaleDateString("en-US", options);
}

/**
 * @param trips
 * @description calculate the number of days remain
 */
let calculateRemainingDays = (trips = []) => {
    for (const element of trips) {
        let countDown = (new Date(element.departing) - new Date()) / (1000 * 60 * 60 * 24);
        element['countDown'] = Math.trunc(countDown);
    }
}