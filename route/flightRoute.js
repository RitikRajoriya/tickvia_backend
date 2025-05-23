const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController'); 

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
router.post('/farerule', flightController.FareRule); 
router.post('/fareprice', flightController.FarePrice); 
router.post('/SSR', flightController.SSRBook);
router.post('/farequote', flightController.FareQuote);
router.post('/seatmap', flightController.SeatMaps);
// router.post('/bookflight', flightController.BookFlight);
module.exports = router;
