const hotalController = require('../controllers/hotalController');
const express = require('express');
const router = express.Router();

// Route to search for hotels
router.post('/search', hotalController.HotelSearch);
router.post('/gethotelinfo', hotalController.GetHotelInfo);
router.post('/getroomlist', hotalController.GetHotelRoom);
router.get('/cityid', hotalController.getCityId);
router.post('/blockroom', hotalController.BlockRoom);
module.exports = router;