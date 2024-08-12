import { Router } from "express";
import { loginHandler, registerHandler } from "../controllers/user.controller";

const router = Router();

/**
 * @openapi
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               phone:
 *                 type: string
 *                 example: 1234567890
 *               userName:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: number
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *                 phone:
 *                   type: string
 *                   example: 1234567890
 *                 userName:
 *                   type: string
 *                   example: johndoe
 *       400:
 *         description: Bad request, missing required fields
 *       409:
 *         description: Conflict, user already exists
 */
router.post("/register", registerHandler);

/**
 * @openapi
 * /login:
 *   post:
 *     summary: User login
 *     description: Logs in a user and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 verify:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI4NzI5MzMyLCJleHBpcmF0aW9uIjozMDB9.d1D2z9nxF7nmZBsL7VE5NwXsK2ih_9RRpVGRx3bY2so"
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: number
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     phone:
 *                       type: string
 *                       example: 1234567890
 *                     userName:
 *                       type: string
 *                       example: johndoe
 *       400:
 *         description: Bad request, missing required fields
 *       401:
 *         description: Unauthorized, invalid email or password
 */
router.post("/login", loginHandler);

export default router;
