// server.js
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const db = require('./config/db'); 
const flightRoutes = require('./route/flightRoute'); // Import flight routes
app.use(express.json());
app.use(cors());

const PORT =  6000;
app.use('/api/v1/flights', flightRoutes);
// Check if DB is connected before starting the server
db.connect((err) => {
    if (err) {
        console.error('Unable to connect to the database');
        process.exit(1); // If DB connection fails, stop the server
    } else {
        console.log('Database connected successfully');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
});
