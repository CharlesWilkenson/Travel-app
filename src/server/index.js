import jsdom from 'jsdom';
import cors from 'cors';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

import tripRoutes from '../server/controller/trips.routes.js';

//dotenv.config();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const PORT = process.env.PORT;
const __dirname = path.resolve();

const app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/dist'));
app.use(express.static('dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// Cors for cross origin allowance//
const corsOptions = {
    origin: '*',
    methods: 'GET, POST, OPTIONS, PUT, DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(tripRoutes);

// Designates what port the app will listen to for incoming requests
app.listen(PORT, function () {
    console.log(`Example app listening on port: ${PORT}`);
});

