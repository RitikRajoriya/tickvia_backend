const axios = require('axios');

const SRDV_API_URL = process.env.recharge_URL ;
const CLIENT_ID = process.env.CLIENT_ID;
const USERNAME = process.env.USERNAMEs;
const endpoint = process.env.EndUserIp;
const PASSWORD = process.env.PASSWORD;
const TOKEN = process.env.TOKEN;

exports.recharge = async (req, res) => {
  const { mobile, amount, operator, type } = req.body;
  if (!mobile || !amount || !operator || !type) {
    return res.status(400).json({ error: 'mobile, amount, operator, and type are required' });
  }

  const payload = {
    EndUserIp: endpoint ,
    ClientId: CLIENT_ID,
    UserName: USERNAME,
    Password: PASSWORD,
    MobileNumber: mobile,
    // Amount: amount,
    // Operator: operator,
    // Type: type 
  };

  try {
    const response = await axios.post(SRDV_API_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Api-Token': TOKEN
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Recharge Error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Recharge failed' });
  }
};

exports.getOperatorList = async (req, res) => {
  const payload = {
    EndUserIp: endpoint,
    ClientId: CLIENT_ID,
    UserName: USERNAME,
    Password: PASSWORD
  };

  try {
    const response = await axios.post(
      `${SRDV_API_URL}OperatorList`, // Use your actual Operator List API URL in .env
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Api-Token': TOKEN
        }
      }
    );
console.log('Operator List Response:', response.data);

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Operator List Error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch operator list' });
  }
};
