import express from "express";
import {
    addTrip,
    deleteTrip,
    getAllTrips,
    getSingleTrip
} from "./trips.controller.js";

const router = express.Router();

router.route("/").get(getAllTrips).post(addTrip);
router.route("/:id").get(getSingleTrip).delete(deleteTrip);

export default router;