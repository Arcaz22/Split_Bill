/**
 * @swagger
 *
 * /user/:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get profil users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Profil User
 *       500:
 *         description: Internal Server Error
 *
 */

/**
 * @swagger
 *
 * /user/find-user:
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

/**
 * @swagger
 *
 * /user/profile:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: update profil user
 *     tags: [Users]
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
 *                          phone:
 *                             description: your phone number
 *                             type: string
 *                             example: "08123456789"
 *                          avatar:
 *                              description: file to upload
 *                              type: file
 *     responses:
 *       200:
 *         description: Update Profil successfully
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
 * /user/change-password:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: change password user
 *     tags: [Users]
  *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: old password user
 *                 example: password
 *               newPassword:
 *                 type: string
 *                 description: new password user
 *                 example: test123
 *               confirmNewPassword:
 *                 type: string
 *                 description: confirm password user
 *                 example: test123
 *     responses:
 *       200:
 *         description: Change Password successfully
 *       400:
 *         description: Password Not Match
 *       500:
 *         description: Internal Server Error
 *
 */
