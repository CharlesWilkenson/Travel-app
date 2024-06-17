import jsdom from 'jsdom';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import {
  addTrip,
  deleteTrip,
  getAllTrips,
  getSingleTrip
} from "./controller/trips.controller.js";

//export default router;
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

dotenv.config();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;

const PORT = process.env.PORT;


const app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../dist'));
app.use(express.static('dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Cors for cross origin allowance//
 const corsOptions = {
     origin: '*',
     methods: 'GET, POST, OPTIONS, PUT, DELETE',
     allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
   optionsSuccessStatus: 200,
 };

app.use(cors(corsOptions));

const router = express.Router();

router.route("/").get(getAllTrips).post(addTrip);
router.route("/:id").get(getSingleTrip).delete(deleteTrip);
app.use(router);


// Designates what port the app will listen to for incoming requests
app.listen(PORT, function () {
    console.log(`Example app listening on port: ${PORT}`);
});

