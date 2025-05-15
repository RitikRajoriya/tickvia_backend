const db = require('../db');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const FAST2SMS_API_KEY = process.env.FAST2SMS_API_KEY;

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

exports.sendOtp = async (req, res) => {
  const { phone } = req.body;
  const otp = generateOtp();

  try {
    // Save OTP to DB
    await db.query('INSERT INTO otps (phone, otp) VALUES (?, ?)', [phone, otp]);

    // Send OTP via Fast2SMS
    const result = await axios.post('https://www.fast2sms.com/dev/bulkV2', {
      variables_values: otp,
      route: 'otp',
      numbers: phone,
    }, {
      headers: {
        'authorization': FAST2SMS_API_KEY,
      },
    });

    res.json({ message: 'OTP sent successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM otps WHERE phone = ? ORDER BY created_at DESC LIMIT 1', [phone]);

    if (rows.length === 0 || rows[0].otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Optionally delete used OTP
    await db.query('DELETE FROM otps WHERE phone = ?', [phone]);

    // Create user if not exists
    const [user] = await db.query('SELECT * FROM users WHERE phone = ?', [phone]);
    if (user.length === 0) {
      await db.query('INSERT INTO users (phone) VALUES (?)', [phone]);
    }

    // Generate JWT
    const token = jwt.sign({ phone }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
