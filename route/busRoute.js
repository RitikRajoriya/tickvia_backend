const express = require('express');
const router = express.Router();
const busController = require('../controllers/busController');

// router.get('/sourcecity')
router.post('/search', busController.searchBus);
router.post('/details', busController.getBusDetails);
router.post('/getseatlayout', busController.GetSeatLayOut);
router.post('/boardingpointdetails', busController.GetBoardingPointDetails);
router.post('/block', busController.Block);
// router.post('/cancel', busController.Cancel);
router.post('/Book', busController.Book);
router.get('/getbusorigin', busController.getBusOriginDestMapping);
module.exports = router;