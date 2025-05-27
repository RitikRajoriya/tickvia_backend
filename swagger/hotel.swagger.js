/**
 * @swagger
 * /api/v1/hotel/search:
 *   post:
 *     summary: Search available hotels
 *     tags: [Hotels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               city:
 *                 type: string
 *                 example: DEL
 *               checkInDate:
 *                 type: string
 *                 format: date
 *                 example: 2024-06-01
 *               checkOutDate:
 *                 type: string
 *                 format: date
 *                 example: 2024-06-05
 *               adults:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: A list of available hotels
 */

/**
 * @swagger
 * /api/v1/hotel/gethotelinfo:
 *   post:
 *     summary: Get detailed information for a hotel
 *     tags: [Hotels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hotelId:
 *                 type: string
 *                 example: "HOTEL123"
 *     responses:
 *       200:
 *         description: Hotel information
 */

/**
 * @swagger
 * /api/v1/hotel/getroomlist:
 *   post:
 *     summary: Get room list for a hotel
 *     tags: [Hotels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hotelId:
 *                 type: string
 *                 example: "HOTEL123"
 *               checkInDate:
 *                 type: string
 *                 format: date
 *                 example: 2024-06-01
 *               checkOutDate:
 *                 type: string
 *                 format: date
 *                 example: 2024-06-05
 *     responses:
 *       200:
 *         description: Room list
 */

/**
 * @swagger
 * /api/v1/hotel/cityid:
 *   get:
 *     summary: Get city ID by city name
 *     tags: [Hotels]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: City name
 *         example: Delhi
 *     responses:
 *       200:
 *         description: City ID
 */

/**
 * @swagger
 * /api/v1/hotel/blockroom:
 *   post:
 *     summary: Block a hotel room
 *     tags: [Hotels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hotelId:
 *                 type: string
 *                 example: "HOTEL123"
 *               roomId:
 *                 type: string
 *                 example: "ROOM456"
 *               checkInDate:
 *                 type: string
 *                 format: date
 *                 example: 2024-06-01
 *               checkOutDate:
 *                 type: string
 *                 format: date
 *                 example: 2024-06-05
 *               guests:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Room blocked successfully
 */