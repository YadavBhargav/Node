import product from "../db/product";

/**
 * @swagger
 * /addProduct:
 *   post:
 *     summary: Create a new student
 *     tags: [Product]
 *     requestBody:
 *       description: Student object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: string
 *               category:
 *                 type: string
 *               userId:
 *                 type: string
 *               companyId:
 *                 type: integer
 *             example:
 *                name: ""
 *                price: ""
 *                category: ""
 *                userId: ""
 *                companyId: ""
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *       400:
 *         description: Invalid request
 */

//Create Student
router.post("/addProduct", product);

/**
 * @swagger
 * /productsList:
 *   get:
 *      tags:
 *          - productsList
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.post("/productsList", product);

/**
 * @swagger
 * /productsListByUserId:
 *   get:
 *      tags:
 *          - Products
 *      parameters:
 *          - in: query
 *            name: userId
 *            required: true
 *            schema:
 *              type: string
 *            description: The ID of the user to fetch products for
 *      responses:
 *          '200':
 *              description: Products fetched successfully
 *          '400':
 *              description: Bad request (e.g., missing userId)
 *          '500':
 *              description: Internal server error
 */

router.get("/productsListByUserId", product);