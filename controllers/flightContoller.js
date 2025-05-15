const axios = require('axios');

// API Credentials
const API_URL = process.env.API_URL ;
const CLIENT_ID = process.env.CLIENT_ID ;
const USERNAME = 'Explore5'; 
const PASSWORD = process.env.PASSWORD ;
const TOKEN = 'Explore@50#1050';

exports.searchFlights = async (req, res) => {
    console.log(API_URL, CLIENT_ID, USERNAME, PASSWORD);
    
  try {
    let { origin, destination, departureDate, adults = 1 } = req.body;

    // Ensure correct date format
    departureDate = new Date(departureDate).toISOString().split('T')[0];

    const payload = {
      EndUserIp: "27.59.124.65",
      ClientId: CLIENT_ID,
      UserName: USERNAME,
      Password: PASSWORD,
      AdultCount: adults,
      ChildCount: 0,
      InfantCount: 0,
      DirectFlight: false,
      OneStopFlight: false,
      JourneyType: "1",
      PreferredAirlines: null,
      Segments: [
        {
          Origin: origin,
          Destination: destination,
          FlightCabinClass: 1,
          PreferredDepartureTime: `${departureDate}T00:00:00`,
          PreferredArrivalTime: `${departureDate}T23:59:00`
        }
      ]
      // Removed "Sources: null"
    };

    const response = await axios.post(`${API_URL}Search`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Api-Token': TOKEN,
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Flight Search Error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to search flights' });
  }
};

exports.routeTrip = async (req, res) => {
    try {
      let {
        origin,
        destination,
        departureDate,
        returnDate,
        adults = 1,
        childCount = 0,
        infantCount = 0,
      } = req.body;
//   console.log(API_URL, CLIENT_ID, USERNAME, PASSWORD);
  
      // Validate and format both dates
      const formatDate = (dateStr) => {
        const parsed = new Date(dateStr);
        if (isNaN(parsed)) throw new Error(`Invalid date format: ${dateStr}`);
        return parsed.toISOString().split('T')[0];
      };
  
      departureDate = formatDate(departureDate);
      returnDate = formatDate(returnDate);
  
      const payload = {
        EndUserIp: "49.43.5.204",
        ClientId: CLIENT_ID,
        UserName: USERNAME,
        Password: PASSWORD,
        AdultCount: adults,
        ChildCount: childCount,
        InfantCount: infantCount,
        JourneyType: "2", // Round Trip
        DirectFlight: false,
        OneStopFlight: false,
        PreferredAirlines: null,
        Segments: [
          {
            Origin: origin,
            Destination: destination,
            FlightCabinClass: 1,
            PreferredDepartureTime: `${departureDate}T00:00:00`,
            PreferredArrivalTime: `${departureDate}T23:59:00`
          },
          {
            Origin: destination,
            Destination: origin,
            FlightCabinClass: 1,
            PreferredDepartureTime: `${returnDate}T00:00:00`,
            PreferredArrivalTime: `${returnDate}T23:59:00`
          }
        ],
        Sources: null
      };
  console.log(payload);
  
      const response = await axios.post(`${API_URL}Search`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Api-Token': TOKEN,
        }
      });
  
      res.status(200).json(response.data);
    //   console.log('Round Trip Flight Search Response:',response);
      
    } catch (error) {
      console.error('Round Trip Flight Search Error:', error?.response?.data || error.message);
      res.status(500).json({ error: 'Failed to search round trip flights' });
    }
  };

