const axios = require("axios");

// API Credentials

const API_URL = process.env.API_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const USERNAME = "Explore5";
const PASSWORD = process.env.PASSWORD;
const TOKEN = "Explore@50#1050";
const EndUserIp = process.env.EndUserIp;

exports.searchFlights = async (req, res) => {
  try {
    let {
      origin,
      destination,
      departureDate,
      adults,
      childCount,
      infantCount,
      fareType,
      flightCabinClass,
    } = req.body;

    const formattedDate = new Date(departureDate).toISOString().split("T")[0];

    const payload = {
      EndUserIp: EndUserIp,
      ClientId: String(CLIENT_ID),
      UserName: String(USERNAME),
      Password: String(PASSWORD),
      AdultCount: String(adults),
      ChildCount: String(childCount),
      InfantCount: String(infantCount),
      JourneyType: "1",
      FareType: fareType || "1",
      Segments: [
        {
          Origin: origin,
          Destination: destination,
          FlightCabinClass: flightCabinClass,
          PreferredDepartureTime: `${formattedDate}T00:00:00`,
          PreferredArrivalTime: `${formattedDate}T00:00:00`, // Match working payload
        },
      ],
    };

    const response = await axios.post(`${API_URL}Search`, payload, {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": TOKEN,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Flight Search Error:",
      error?.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to search flights" });
  }
};

exports.routeTrip = async (req, res) => {
  try {
    let {
      origin,
      destination,
      departureDate,
      returnDate,
      adults,
      childCount,
      infantCount,
    } = req.body;

    // Format date to YYYY-MM-DD
    const formatDate = (dateStr) => {
      const parsed = new Date(dateStr);
      if (isNaN(parsed)) throw new Error(`Invalid date format: ${dateStr}`);
      return parsed.toISOString().split("T")[0];
    };

    departureDate = formatDate(departureDate);
    returnDate = formatDate(returnDate);

    // Construct payload matching working format
    const payload = {
      EndUserIp: EndUserIp,
      ClientId: String(CLIENT_ID),
      UserName: String(USERNAME),
      Password: String(PASSWORD),
      AdultCount: String(adults),
      ChildCount: String(childCount),
      InfantCount: String(infantCount),
      JourneyType: "2",
      Segments: [
        {
          Origin: origin,
          Destination: destination,
          FlightCabinClass: "1",
          PreferredDepartureTime: `${departureDate}T00:00:00`,
          PreferredArrivalTime: `${departureDate}T00:00:00`,
        },
        {
          Origin: destination,
          Destination: origin,
          FlightCabinClass: "1",
          PreferredDepartureTime: `${returnDate}T00:00:00`,
          PreferredArrivalTime: `${returnDate}T00:00:00`,
        },
      ],
      Sources: null,
      // ❌ Don't include DirectFlight, OneStopFlight, PreferredAirlines — they restrict results
    };

    //   console.log('Sending Payload:', payload);

    const response = await axios.post(`${API_URL}Search`, payload, {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": TOKEN,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Round Trip F   light Search Error:",
      error?.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to search round trip flights" });
  }
};
exports.FareRule = async (req, res) => {
  try {
    const { TraceId, ResultIndex, SrdvType, SrdvIndex } = req.body;

    if (!TraceId || !ResultIndex || !SrdvType || !SrdvIndex) {
      return res.status(400).json({ error: "Missing required parameters." });
    }

    const payload = {
      EndUserIp: EndUserIp,
      ClientId: String(CLIENT_ID),
      UserName: String(USERNAME),
      Password: String(PASSWORD),
      TraceId,
      ResultIndex,
      SrdvType,
      SrdvIndex,
    };

    const response = await axios.post(`${API_URL}FareRule`, payload, {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": TOKEN,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("FareRule Error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch fare rule" });
  }
};
exports.FarePrice = async (req, res) => {
  try {
    const { TraceId, ResultIndex, SrdvType, SrdvIndex } = req.body;

    if (!TraceId || !ResultIndex || !SrdvType || !SrdvIndex) {
      return res.status(400).json({ error: "Missing required parameters." });
    }

    const payload = {
      EndUserIp: "49.43.5.204",
      ClientId: String(CLIENT_ID),
      UserName: String(USERNAME),
      Password: String(PASSWORD),
      TraceId,
      ResultIndex,
      SrdvType,
      SrdvIndex,
    };
    const response = await axios.post(`${API_URL}FarePrice`, payload, {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": TOKEN,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("FarePrice Error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch fare price" });
  }
};

exports.SSRBook = async (req, res) => {
  try {
    const { TraceId, ResultIndex, SrdvType, SrdvIndex } = req.body;

    if (!TraceId || !ResultIndex || !SrdvType || !SrdvIndex) {
      return res.status(400).json({ error: "Missing required parameters." });
    }

    const payload = {
      EndUserIp: EndUserIp,
      ClientId: String(CLIENT_ID),
      UserName: String(USERNAME),
      Password: String(PASSWORD),
      TraceId,
      ResultIndex,
      SrdvType,
      SrdvIndex,
    };
    const response = await axios.post(`${API_URL}SSR`, payload, {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": TOKEN,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("FarePrice Error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch fare price" });
  }
};
exports.FareQuote = async (req, res) => {
  try {
    const { TraceId, ResultIndex, SrdvType, SrdvIndex } = req.body;

    if (!TraceId || !ResultIndex || !SrdvType || !SrdvIndex) {
      return res.status(400).json({ error: "Missing required parameters." });
    }

    const payload = {
      EndUserIp: EndUserIp,
      ClientId: String(CLIENT_ID),
      UserName: String(USERNAME),
      Password: String(PASSWORD),
      TraceId,
      ResultIndex,
      SrdvType,
      SrdvIndex,
    };
    const response = await axios.post(`${API_URL}FareQuote`, payload, {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": TOKEN,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("FarePrice Error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch fare price" });
  }
};
exports.ticketlcc = async (req, res) => {
  try {
    // Destructure required fields from the request body
    const { SrdvType, SrdvIndex, TraceId, ResultIndex, Passengers } = req.body;

    // Validate required fields
    if (!SrdvType || !SrdvIndex || !TraceId || !ResultIndex || !Passengers) {
      return res.status(400).json({ error: "Missing required parameters." });
    }

    // Prepare payload as per your requirement
    const payload = {
      EndUserIp: EndUserIp,
      ClientId: String(CLIENT_ID),
      UserName: String(USERNAME),
      Password: String(PASSWORD),
      SrdvType,
      SrdvIndex,
      TraceId,
      ResultIndex,
      Passengers,
    };

    // Call the external API
    const response = await axios.post(`${API_URL}TicketLCC`, payload, {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": TOKEN,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("TicketLCC Error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to book LCC ticket" });
  }
};
exports.SeatMaps = async (req, res) => {
  try {
    const { TraceId, ResultIndex, SrdvType, SrdvIndex } = req.body;

    if (!TraceId || !ResultIndex || !SrdvType || !SrdvIndex) {
      return res.status(400).json({ error: "Missing required parameters." });
    }

    const payload = {
      EndUserIp: EndUserIp,
      ClientId: String(CLIENT_ID),
      UserName: String(USERNAME),
      Password: String(PASSWORD),
      TraceId,
      ResultIndex,
      SrdvType,
      SrdvIndex,
    };
    const response = await axios.post(`${API_URL}SeatMap`, payload, {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": TOKEN,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("FarePrice Error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch fare price" });
  }
};

// exports.BookFlight = async (req, res) => {
//     try {
//       const {
//         TraceId,
//         ResultIndex,
//         SrdvType,
//         SrdvIndex,
//         PassengerDetails,
//         PaymentDetails
//       } = req.body;

//       if (!TraceId || !ResultIndex || !SrdvType || !SrdvIndex || !PassengerDetails || !PaymentDetails) {
//         return res.status(400).json({ error: 'Missing required parameters.' });
//       }

//       const payload = {
//         EndUserIp: EndUserIp,
//         ClientId: String(CLIENT_ID),
//         UserName: String(USERNAME),
//         Password: String(PASSWORD),
//         TraceId,
//         ResultIndex,
//         SrdvType,
//         SrdvIndex,
//         PassengerDetails,
//         PaymentDetails
//       };

//       const response = await axios.post(`${API_URL}Book`, payload, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Api-Token': TOKEN,
//         }
//       });

//       res.status(200).json(response.data);
//     } catch (error) {
//       console.error('Flight Booking Error:', error?.response?.data || error.message);
//       res.status(500).json({ error: 'Failed to book flight' });
//     }
// };
