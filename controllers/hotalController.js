const axios = require('axios');

// API Credentials
const API_URL = process.env.API_HOTAL_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const USERNAME = process.env.USERNAMEs;
const PASSWORD = process.env.PASSWORD;
const TOKEN = 'Explore@50#1050'; // Ensure this matches your backend config or environment
// console.log("API_URL", API_URL);

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
      ClientId: "180137",
      UserName: "Explore5",
      Password: "Explore@50",
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
