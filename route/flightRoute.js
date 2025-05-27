const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController'); 



// Route to search for flights
router.post('/search', flightController.searchFlights); 
router.post('/search/route', flightController.routeTrip); 
router.post('/farerule', flightController.FareRule); 
router.post('/SSR', flightController.SSRBook);
router.post('/farequote', flightController.FareQuote);
router.post('/seatmap', flightController.SeatMaps);
router.post('/ticketlcc', flightController.ticketlcc);
// router.post('/bookflight', flightController.BookFlight);
module.exports = router;
