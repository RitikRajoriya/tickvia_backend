const authController = require('../controllers/authController');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authmiddleware');
router.post('/send-otp', authController.sendOtp);
router.post('/verify-otp', authController.verifyOtp);
router.get('/me' ,authMiddleware.verifyToken, authController.getProfile);
module.exports = router;