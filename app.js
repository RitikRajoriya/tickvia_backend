// server.js
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const db = require('./config/db');
const flightRoutes = require('./route/flightRoute');

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1/flights', flightRoutes);

// Swagger docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Server
const PORT = process.env.PORT || 3000;
db.connect((err) => {
    if (err) {
        console.error('Unable to connect to the database');
        process.exit(1);
    } else {
        console.log('Database connected successfully');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
        });
    }
});
