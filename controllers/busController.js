const axios = require('axios');
const API_URL = process.env.BUS_API_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const USERNAME = process.env.USERNAMEs;
const PASSWORD = process.env.PASSWORD;
const TOKEN = process.env.TOKEN;

// Search available buses
exports.searchBus = async (req, res) => {
  try {
   const {
    source_city,
    source_code,
    destination_city,
    destination_code,
    depart_date
  } = req.body;


    // if (!source || !destination || !journeyDate) {
    //   return res.status(400).json({ error: 'source, destination, and journeyDate are required' });
    // }

    // const formattedDate = journeyDate.trim(); // Prevent hidden character issues

    const payload = {
      EndUserIp: req.ip || "1.1.1.1",
      ClientId: CLIENT_ID,
      UserName: USERNAME,
      Password: PASSWORD,
      source_city,
      source_code,
      destination_city ,
      destination_code,
     depart_date ,
    };

    console.log("Sending to SRDV:", payload);

    const response = await axios.post(`${API_URL}/Search`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Api-Token': TOKEN
      }
    });

    console.log('Bus Search Response:', response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Bus Search Error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to search buses' });
  }
};



// Get bus details
exports.getBusDetails = async (req, res) => {
  const { busId, journeyDate } = req.body;
  if (!busId || !journeyDate) {
    return res.status(400).json({ error: 'busId and journeyDate are required' });
  }
  const payload = {
    EndUserIp: req.ip || "1.1.1.1",
    ClientId: CLIENT_ID,
    UserName: USERNAME,
    Password: PASSWORD,
    BusId: busId,
    JourneyDate: journeyDate
  };
  try {
    const response = await axios.post(`${API_URL}/GetBusDetails`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Api-Token': TOKEN
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Get Bus Details Error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get bus details' });
  }
};