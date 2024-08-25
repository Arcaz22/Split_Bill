/**
 * @swagger
 *
 * /file/preview:
 *   get:
 *     summary: Get a preview of a file
 *     tags: [Files]
 *     parameters:
 *       - name: fieldName
 *         in: query
 *         description: Field name used for determining the directory
 *         required: true
 *         schema:
 *           type: string
 *       - name: fileName
 *         in: query
 *         description: Name of the file to preview
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: File preview successfully retrieved
 *       400:
 *         description: Bad request, invalid parameters
 *       404:
 *         description: File not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 *
 * /file/download:
 *   get:
 *     summary: Get a download of a file
 *     tags: [Files]
 *     parameters:
 *       - name: fieldName
 *         in: query
 *         description: Field name used for determining the directory
 *         required: true
 *         schema:
 *           type: string
 *       - name: fileName
 *         in: query
 *         description: Name of the file to download
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: File download successfully retrieved
 *       400:
 *         description: Bad request, invalid parameters
 *       404:
 *         description: File not found
 *       500:
 *         description: Internal Server Error
 */
