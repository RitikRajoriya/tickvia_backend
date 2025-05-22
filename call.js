const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const IVRGURU_API_URL = 'https://portal.ivrguru.com/api/click-to-call'; 
const API_KEY = 'your_api_key';
const VIRTUAL_NUMBER = '7289016170';

app.post('/make-call', async (req, res) => {
  const { userNumber, driverNumber } = req.body;

  try {
    const response = await axios.post(IVRGURU_API_URL, {
      api_key: API_KEY,
      virtual_number: VIRTUAL_NUMBER,
      caller_number: userNumber,
      receiver_number: driverNumber
    });

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Error initiating call:', error.message);
    res.status(500).json({ success: false, message: 'Failed to initiate call' });
  }
});

app.listen(4500, () => {
  console.log('Server running on port 4500');
});
