import express from "express";
import {
  addTrip,
  deleteTrip,
  getAllTrips,
  getSingleTrip,
  updateTrip,
} from "./trips.controller.js";

const router = express.Router();

router.route("/").get(getAllTrips).post(addTrip).put(updateTrip);
router.route("/:id").get(getSingleTrip).delete(deleteTrip);

export default router;