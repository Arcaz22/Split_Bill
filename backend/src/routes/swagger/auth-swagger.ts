/**
 * @swagger
 *
 * /auth/register:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: create new user
 *     tags: [Auth]
 *     requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              description: user username
 *                              type: string
 *                              example: test
 *                          email:
 *                              description: user email
 *                              type: string
 *                              example: test@gmail.com
 *                          password:
 *                              description: user password min 6 character
 *                              type: string
 *                              example: password
 *                          phone:
 *                             description: your phone number
 *                             type: string
 *                             example: "08123456789"
 *                          avatar:
 *                              description: file to upload
 *                              type: file
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Invalid role
 *       409:
 *         description: User and email already exists
 *       500:
 *         description: Internal Server Error
 *
 */
