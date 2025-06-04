const express = require('express');
const router = express.Router();
const busController = require('../controllers/busController');

router.post('/search', busController.searchBus);
router.post('/details', busController.getBusDetails);

module.exports = router;