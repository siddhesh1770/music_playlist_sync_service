require("dotenv").config({ path: "./config.env" });
const cors = require("cors");
const express = require("express");
const connectDb = require("./service/mongo");
const bodyParser = require("body-parser");


// Connection to Mongo Database
connectDb();
// Express app intialization
const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());

app.use('/spotify', require('./routes/spotifyRoutes'));

const port = process.env.PORT || 1770;

// Start listneing port here
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
});
