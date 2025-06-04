const express = require('express');
const router = express.Router();
const rechargeController = require('../controllers/rechargeController');

router.post('/recharge', rechargeController.recharge);
router.post('/operators', rechargeController.getOperatorList);
module.exports = router;