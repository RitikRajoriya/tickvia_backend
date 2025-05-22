const hotalController = require('../controllers/hotalController');
const express = require('express');
const router = express.Router();
/**
 * @swagger
 * /hotel/search:
 *   post:
 *     summary: Search available hotels
 *     tags: [Hotels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               city:
 *                 type: string
 *               checkInDate:
 *                 type: string
 *                 format: date
 *               checkOutDate:
 *                 type: string
 *                 format: date
 *               adults:
 *                 type: integer
 *                 default: 1
 *     responses:
 *       200:
 *         description: A list of available hotels
 */
// Route to search for hotels
router.post('/search', hotalController.HotelSearch);
router.post('/gethotelinfo', hotalController.GetHotelInfo);
router.post('/getroomlist', hotalController.GetHotelRoom);
router.get('/cityid', hotalController.getCityId);
router.post('/blockroom', hotalController.BlockRoom);
module.exports = router;