const db = require('../config/db');
exports.profile = async (req, res) => {
  try {
    

  } catch (err) {
    console.error('OTP send error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};