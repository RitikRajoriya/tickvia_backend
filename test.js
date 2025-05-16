const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const SMS_API_URL = "https://amazesms.in/api/pushsms";
const USER = "Rahuljain";
const AUTH_KEY = "92d8tYM01idnc";
const SENDER = "WDMRKT";
const ENTITY_ID = "1001581233511362172";
const TEMPLATE_ID = "1007439327043893034";

function generateOTP(length = 6) {
  return Math.floor(100000 + Math.random() * 900000).toString().slice(0, length);
}

app.post('/send-otp', async (req, res) => {
  const { mobile } = req.body;
  if (!mobile) return res.status(400).json({ error: 'Mobile number is required' });

  const otp =  generateOTP();
  const text = `Your OTP is ${otp}. Do not share it with anyone.`;

  try {
    const response = await axios.get(SMS_API_URL, {
      params: {
        user: USER,
        authkey: AUTH_KEY,
        sender: SENDER,
        mobile: mobile,
        text: text,
        entityid: ENTITY_ID,
        templateid: TEMPLATE_ID
      }
    });
console.log(`SMS API Response: ${response.data}`);

    // Log or save OTP securely for verification
    // console.log(`OTP for ${mobile}: ${otp}`);

    res.json({
      success: true,
      message: 'OTP sent successfully',
      otp // ⚠️ For development only. Remove this in production
    });
  } catch (error) {
    console.error('SMS API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`OTP API running on port ${PORT}`);
});
