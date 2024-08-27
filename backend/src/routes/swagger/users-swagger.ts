/**
 * @swagger
 *
 * /user/:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get all users
 *     tags: [Users]
 *     parameters:
 *      - in: query
 *        name: page
 *        required: false
 *        description: The page of list
 *      - in: query
 *        name: length
 *        required: false
 *        description: The length of list
 *      - in: query
 *        name: search
 *        required: false
 *        description: search with keyword user id, username and email
 *     responses:
 *       200:
 *         description: A list of users
 *       500:
 *         description: Internal Server Error
 *
 */
