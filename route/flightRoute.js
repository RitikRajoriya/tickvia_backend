const flightController = require('../controllers/flightContoller');
const express = require('express');
const router = express.Router();
/**
 * @swagger
 * /flights/search:
 *   post:
 *     summary: Search available flights
 *     tags: [Flights]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               origin:
 *                 type: string
 *               destination:
 *                 type: string
 *               departureDate:
 *                 type: string
 *                 format: date
 *               adults:
 *                 type: integer
 *                 default: 1
 *     responses:
 *       200:
 *         description: A list of available flights
 */

// Route to search for flights
router.post('/search', flightController.searchFlights); 
router.post('/search/route', flightController.routeTrip); 
module.exports = router;
