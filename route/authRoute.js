const authController = require('../controllers/authController');
const express = require('express');
const router = express.Router();

router.post('/send-otp', authController.sendOtp);
router.post('/verify-otp', authController.verifyOtp);
module.exports = router;