const axios = require('axios');
const db = require('../config/db');
// API Credentials
const API_URL = process.env.API_HOTAL_URL;
const EndUserIp = process.env.EndUserIp;
const CLIENT_ID = process.env.CLIENT_ID;
const USERNAME = process.env.USERNAMEs;
const PASSWORD = process.env.PASSWORD;
// const TOKEN = 'Explore@50#1050';
 const TOKEN = process.env.TOKEN;
// console.log("API_URL", API_URL);

exports.getCityId = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM hotel_city_code_v8');
        res.status(200).json({ success: true, data: rows });
        
    } catch (error) {
        console.error('Error fetching city ID:', error);
        res.status(500).json({ error: 'Failed to fetch city ID' });
    }
};
exports.HotelSearch = async (req, res) => {
  try {
    const {
      CheckInDate,
      CheckOutDate,
      NoOfNights = "1",
      CountryCode = "IN",
      CityId,
      NoOfRooms = "1",
      RoomGuests = [],
      PreferredCurrency = "INR",
      GuestNationality = "IN",
      PreferredHotel = "",
      MaxRating = "5",
      MinRating = "0",
      ReviewScore = null,
      IsNearBySearchAllowed = false
    } = req.body;

    // Validate critical fields
    if (!CheckInDate || !CheckOutDate || !CityId || !RoomGuests.length) {
      return res.status(400).json({
        error: 'Missing required fields: CheckInDate, CheckOutDate, CityId, or RoomGuests.'
      });
    }



    const payload = {
      EndUserIp: "49.43.5.204", // Static or dynamic IP depending on API policy
      ClientId: CLIENT_ID,
      UserName: USERNAME,
      Password: PASSWORD,
      CheckInDate,
      CheckOutDate,
      NoOfNights,
      BookingMode: "5",
      CountryCode,
      CityId,
      ResultCount: "500",
      PreferredCurrency,
      GuestNationality,
      NoOfRooms,
      RoomGuests,
      PreferredHotel,
      MaxRating,
      MinRating,
      ReviewScore,
      IsNearBySearchAllowed
    };

    console.log("HotelSearch Payload:", payload);
// console.log(API_URL);

    const response = await axios.post(`${API_URL}/Search`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Api-Token': TOKEN
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('HotelSearch Error:', error);
    res.status(500).json({ error: 'Failed to search hotels' });
  }
};
exports.GetHotelInfo = async (req, res) => {
    try {
      const {
        TraceId,
        SrdvType,
        SrdvIndex,
        ResultIndex,
        HotelCode
      } = req.body;
  
      if (!TraceId || !SrdvType || !SrdvIndex || !ResultIndex || !HotelCode) {
        return res.status(400).json({
          error: 'Missing required fields: TraceId, SrdvType, SrdvIndex, ResultIndex, HotelCode.'
        });
      }
  
      const payload = {
        EndUserIp: "49.43.5.204",
        ClientId: "180137",
        UserName: "Explore5",
        Password: "Explore@50",
        TraceId,
        SrdvType,
        SrdvIndex,
        ResultIndex,
        HotelCode
      };
  
      console.log("GetHotelInfo Payload:", payload);
  
      const response = await axios.post(`${API_URL}/GetHotelInfo`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Api-Token': TOKEN
        }
      });
  
      res.status(200).json(response.data);
    } catch (error) {
      console.error('GetHotelInfo Error:', error?.response?.data || error.message);
      res.status(500).json({ error: 'Failed to retrieve hotel information' });
    }
  };
  
  exports.GetHotelRoom = async (req, res) => {
    try {
      const {
        TraceId,
        SrdvType,
        SrdvIndex,
        ResultIndex,
        HotelCode
      } = req.body;
  
      if (!TraceId || !SrdvType || !SrdvIndex || !ResultIndex || !HotelCode) {
        return res.status(400).json({
          error: 'Missing required fields: TraceId, SrdvType, SrdvIndex, ResultIndex, HotelCode.'
        });
      }
  
      const payload = {
        EndUserIp: EndUserIp,
        ClientId: CLIENT_ID,
        UserName: USERNAME,
        Password: PASSWORD,
        TraceId,
        SrdvType,
        SrdvIndex,
        ResultIndex,
        HotelCode
      };
  
      console.log("GetHotelInfo Payload:", payload);
  
      const response = await axios.post(`${API_URL}/GetHotelRoom`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Api-Token': TOKEN
        }
      });
  
      res.status(200).json(response.data);
    } catch (error) {
      console.error('GetHotelInfo Error:', error?.response?.data || error.message);
      res.status(500).json({ error: 'Failed to retrieve hotel information' });
    }
  };