const db = require('../config/db');
const jwt = require('jsonwebtoken');
const axios = require('axios');

// AmazeSMS config
const SMS_API_URL = "https://amazesms.in/api/pushsms";
const SMS_CONFIG = {
  user: "Thegovibe",
  authkey: "92K8IQG8MHEk",
  sender: "TGVIBE",
  entityid: "1001280136024866095",
  templateid: "1007741649970181823"
};

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP API
exports.sendOtp = async (req, res) => {
  try {
    let { mobile } = req.body;
    if (!mobile) return res.status(400).json({ error: 'Mobile number is required' });

    // Ensure country code
     mobile.startsWith('91') ? mobile : '91' + mobile;

    const otp = generateOTP();
    const text = `Your OTP for The tick via login is ${otp}. It is valid for 5 minutes. Please do not share this OTP with anyone.`;

    // Save OTP to DB
    await db.query('INSERT INTO otps (mobile, otp) VALUES (?, ?)', [mobile, otp]);

    // Send OTP via SMS
    await axios.get(SMS_API_URL, {
      params: {
        user: SMS_CONFIG.user,
        authkey: SMS_CONFIG.authkey,
        sender: SMS_CONFIG.sender,
        mobile,
        text,
        entityid: SMS_CONFIG.entityid,
        templateid: SMS_CONFIG.templateid
      }
    });

    res.json({
      success: true,
      message: 'OTP sent successfully'
      // Do not send OTP in response in production!
    });
  } catch (err) {
    console.error('OTP send error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

// Verify OTP API
exports.verifyOtp = async (req, res) => {
  const { mobile, otp } = req.body;
  mobile.startsWith('91') ? mobile : '91' + mobile;
// console.log(`Mobile: ${mobile}/, OTP: ${otp}`);
  if (!mobile || !otp) {
    return res.status(400).json({ error: 'Mobile number and OTP are required' });
  }

  try {
    // Get latest OTP for this phone
    const [rows] = await db.query('SELECT * FROM otps WHERE mobile = ? ORDER BY created_at DESC LIMIT 1', [mobile]);
    if (rows.length === 0 || rows[0].otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Delete used OTP
    await db.query('DELETE FROM otps WHERE mobile = ?', [mobile]);

    // Create user if not exists
    const [user] = await db.query('SELECT * FROM users WHERE mobile = ?', [mobile]);
    if (user.length === 0) {
      await db.query('INSERT INTO users (mobile) VALUES (?)', [mobile]);
    }

    // Generate JWT
    const token = jwt.sign({  mobile }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'OTP verified successfully', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};