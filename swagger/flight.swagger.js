/**
 * @swagger
 * /api/v1/flights/search:
 *   post:
 *     summary: Search for one-way flights
 *     tags:
 *       - Flights
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               origin:
 *                 type: string
 *                 example: DEL
 *               destination:
 *                 type: string
 *                 example: BOM
 *               departureDate:
 *                 type: string
 *                 example: 2024-06-01
 *               adults:
 *                 type: integer
 *                 example: 1
 *               childCount:
 *                 type: integer
 *                 example: 0
 *               infantCount:
 *                 type: integer
 *                 example: 0
 *               FlightCabinClass:
 *                 type: string
 *                 example: "1"
 *     responses:
 *       200:
 *         description: Flight search results
 */

/**
 * @swagger
 * /api/v1/flights/search/route:
 *   post:
 *     summary: Search for round-trip flights
 *     tags:
 *       - Flights
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               origin:
 *                 type: string
 *                 example: DEL
 *               destination:
 *                 type: string
 *                 example: BOM
 *               departureDate:
 *                 type: string
 *                 example: 2024-06-01
 *               returnDate:
 *                 type: string
 *                 example: 2024-06-10
 *               adults:
 *                 type: integer
 *                 example: 1
 *               childCount:
 *                 type: integer
 *                 example: 0
 *               infantCount:
 *                 type: integer
 *                 example: 0
 *               FlightCabinClass:
 *                 type: string
 *                 example: "1"
 *     responses:
 *       200:
 *         description: Round trip flight search results
 */

/**
 * @swagger
 * /api/v1/flights/farerule:
 *   post:
 *     summary: Get fare rules for a flight
 *     tags:
 *       - Flights
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TraceId:
 *                 type: string
 *                 example: your_trace_id
 *               ResultIndex:
 *                 type: string
 *                 example: your_result_index
 *               SrdvType:
 *                 type: string
 *                 example: MixAPI
 *               SrdvIndex:
 *                 type: string
 *                 example: "2"
 *     responses:
 *       200:
 *         description: Fare rule details
 */

/**
 * @swagger
 * /api/v1/flights/SSR:
 *   post:
 *     summary: Get SSR (Special Service Request) details
 *     tags:
 *       - Flights
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               EndUserIp:
 *                 type: string
 *                 example: 1.1.1.1
 *               ClientId:
 *                 type: string
 *                 example: your_client_id
 *               UserName:
 *                 type: string
 *                 example: your_username
 *               Password:
 *                 type: string
 *                 example: your_password
 *               SrdvType:
 *                 type: string
 *                 example: MixAPI
 *               SrdvIndex:
 *                 type: string
 *                 example: "2"
 *               TraceId:
 *                 type: string
 *                 example: your_trace_id
 *               ResultIndex:
 *                 type: string
 *                 example: your_result_index
 *     responses:
 *       200:
 *         description: SSR details
 */

/**
 * @swagger
 * /api/v1/flights/farequote:
 *   post:
 *     summary: Get fare quote for a flight
 *     tags:
 *       - Flights
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TraceId:
 *                 type: string
 *                 example: your_trace_id
 *               ResultIndex:
 *                 type: string
 *                 example: your_result_index
 *               SrdvType:
 *                 type: string
 *                 example: MixAPI
 *               SrdvIndex:
 *                 type: string
 *                 example: "2"
 *     responses:
 *       200:
 *         description: Fare quote details
 */

/**
 * @swagger
 * /api/v1/flights/seatmap:
 *   post:
 *     summary: Get seat map for a flight
 *     tags:
 *       - Flights
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TraceId:
 *                 type: string
 *                 example: your_trace_id
 *               ResultIndex:
 *                 type: string
 *                 example: your_result_index
 *               SrdvType:
 *                 type: string
 *                 example: MixAPI
 *               SrdvIndex:
 *                 type: string
 *                 example: "2"
 *     responses:
 *       200:
 *         description: Seat map details
 */

/**
 * @swagger
 * /api/v1/flights/ticketlcc:
 *   post:
 *     summary: Book LCC flight ticket
 *     tags:
 *       - Flights
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               SrdvType:
 *                 type: string
 *                 example: MixAPI
 *               SrdvIndex:
 *                 type: string
 *                 example: "2"
 *               TraceId:
 *                 type: string
 *                 example: your_trace_id
 *               ResultIndex:
 *                 type: string
 *                 example: your_result_index
 *               Passengers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     Title:
 *                       type: string
 *                       example: Mr
 *                     FirstName:
 *                       type: string
 *                       example: First
 *                     LastName:
 *                       type: string
 *                       example: Name
 *                     PaxType:
 *                       type: integer
 *                       example: 1
 *                     DateOfBirth:
 *                       type: string
 *                       example: ""
 *                     Gender:
 *                       type: string
 *                       example: "1"
 *                     PassportNo:
 *                       type: string
 *                       example: ""
 *                     PassportExpiry:
 *                       type: string
 *                       example: ""
 *                     PassportIssueDate:
 *                       type: string
 *                       example: ""
 *                     AddressLine1:
 *                       type: string
 *                       example: A152 Ashok Nagar
 *                     City:
 *                       type: string
 *                       example: Delhi
 *                     CountryCode:
 *                       type: string
 *                       example: IN
 *                     CountryName:
 *                       type: string
 *                       example: INDIA
 *                     ContactNo:
 *                       type: string
 *                       example: 9999999999
 *                     Email:
 *                       type: string
 *                       example: test@example.com
 *                     Baggage:
 *                       type: array
 *                       items: {}
 *                     MealDynamic:
 *                       type: array
 *                       items: {}
 *                     Seat:
 *                       type: array
 *                       items: {}
 *                     IsLeadPax:
 *                       type: integer
 *                       example: 1
 *                     Fare:
 *                       type: object
 *                       properties:
 *                         BaseFare:
 *                           type: number
 *                           example: 3691
 *                         Tax:
 *                           type: number
 *                           example: 1465
 *                         TransactionFee:
 *                           type: string
 *                           example: "0"
 *                         YQTax:
 *                           type: number
 *                           example: 700
 *                         AdditionalTxnFeeOfrd:
 *                           type: string
 *                           example: ""
 *                         AdditionalTxnFeePub:
 *                           type: string
 *                           example: ""
 *                         AirTransFee:
 *                           type: string
 *                           example: "0"
 *     responses:
 *       200:
 *         description: Ticket booking result
 */