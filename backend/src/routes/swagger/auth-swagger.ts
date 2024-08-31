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
 *                          name:
 *                              description: user username
 *                              type: string
 *                              example: nama saya testing
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
 *                          confirmPassword:
 *                              description: user confirm password min 6 character
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

/**
 * @swagger
 *
 * /auth/login:
 *   post:
 *      summary: login for user
 *      tags: [Auth]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              description: username user or user phone number
 *                              type: string
 *                              example: test@gmail.com
 *                          password:
 *                              description: user password
 *                              type: string
 *                              example: password
 *      responses:
 *          200:
 *              description: login token
 *          401:
 *              description: invalid token
 *          500:
 *              description: Internal Server Error
 *
 */

/**
 * @swagger
 *
 * /auth/logout:
 *   post:
 *      security:
 *       - bearerAuth: []
 *      summary: change password for user
 *      tags: [Auth]
 *      responses:
 *          200:
 *              description: logut success
 *          500:
 *              description: Internal Server Error
 */
