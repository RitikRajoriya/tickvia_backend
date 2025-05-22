const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 4500;

// 👇 TEMP in-memory OTP store (for demo)
const otpStore = new Map();

// 👇 SMS API Configuration
const SMS_API_URL = "https://amazesms.in/api/pushsms";
const USER = "Thegovibe";
const AUTH_KEY = "92K8IQG8MHEk";
const SENDER = "TGVIBE";
const ENTITY_ID = "1001581233511362172";
const TEMPLATE_ID = "1007439327043893034";

// 👇 Generate a 6-digit OTP
function generateOTP(length = 6) {
  return Math.floor(100000 + Math.random() * 900000).toString().slice(0, length);
}

// 👇 Route: Send OTP
app.post('/send-otp', async (req, res) => {
  try {
    let { mobile } = req.body;
    if (!mobile) return res.status(400).json({ error: 'Mobile number is required' });

    // Ensure mobile number has country code (91)
    if (!mobile.startsWith('91')) {
      mobile = '91' + mobile;
    }

    const otp = generateOTP();
    const text = `Your OTP is ${otp}. Do not share it with anyone.`;

    const response = await axios.get(SMS_API_URL, {
      params: {
        user: USER,
        authkey: AUTH_KEY,
        sender: SENDER,
        mobile,
        text,
        entityid: ENTITY_ID,
        templateid: TEMPLATE_ID
      }
    });

    console.log(`SMS sent to ${mobile}: ${otp}`);
    console.log(`SMS API Response:`, response.data);

    // Store OTP (expires in 5 minutes)
    otpStore.set(mobile, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

    res.json({
      success: true,
      message: 'OTP sent successfully',
      otp: otp // ⚠️ Dev only: remove before production
    });
  } catch (error) {
    console.error('SMS API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// 👇 Route: Verify OTP
app.post('/verify-otp', (req, res) => {
  const { mobile, otp } = req.body;
  if (!mobile || !otp) return res.status(400).json({ error: 'Mobile and OTP required' });

  const formattedMobile = mobile.startsWith('91') ? mobile : '91' + mobile;
  const stored = otpStore.get(formattedMobile);

  if (!stored) return res.status(400).json({ error: 'No OTP found or expired' });

  if (Date.now() > stored.expiresAt) {
    otpStore.delete(formattedMobile);
    return res.status(400).json({ error: 'OTP expired' });
  }

  if (stored.otp !== otp) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }

  otpStore.delete(formattedMobile); // Clean up on success
  return res.json({ success: true, message: 'OTP verified successfully' });
});

// 👇 Start Server
app.listen(PORT, () => {
  console.log(`OTP API server running on http://localhost:${PORT}`);
});
