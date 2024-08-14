import { Router } from "express";
import {
  followUserHandler,
  getFollowedUserEventsHandler,
} from "../controllers/follow.controller";
import { isAuth } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @openapi
 * /followers:
 *   post:
 *     summary: Follow a user
 *     description: Allows a user to follow another user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               followedId:
 *                 type: integer
 *                 example: 2
 *                 description: The ID of the user to be followed.
 *     responses:
 *       200:
 *         description: Successfully followed the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Followed successfully
 *       400:
 *         description: Bad request, user not found or already following
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       401:
 *         description: Unauthorized, authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Authentication required
 */

router.post("/followers", isAuth, followUserHandler);

/**
 * @openapi
 * /eventsFollwers:
 *   get:
 *     summary: Get events from followed users
 *     description: Retrieves events from users that the authenticated user is following.
 *     responses:
 *       200:
 *         description: Successfully retrieved events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   eventId:
 *                     type: integer
 *                     example: 1
 *                     description: The ID of the event.
 *                   title:
 *                     type: string
 *                     example: "Music Concert"
 *                     description: The title of the event.
 *                   description:
 *                     type: string
 *                     example: "A grand music concert featuring various artists."
 *                     description: The description of the event.
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: "2024-09-15"
 *                     description: The date of the event.
 *                   time:
 *                     type: string
 *                     format: time
 *                     example: "18:00:00"
 *                     description: The time of the event.
 *                   location:
 *                     type: string
 *                     example: "Central Park"
 *                     description: The location of the event.
 *                   image:
 *                     type: string
 *                     example: "event-image.jpg"
 *                     description: The image URL of the event.
 *                   category:
 *                     type: string
 *                     example: "Music"
 *                     description: The category of the event.
 *                   likes:
 *                     type: integer
 *                     example: 150
 *                     description: The number of likes for the event.
 *                   user:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: integer
 *                         example: 2
 *                         description: The ID of the user who created the event.
 *                       name:
 *                         type: string
 *                         example: "Jane Doe"
 *                         description: The name of the user who created the event.
 *                       userName:
 *                         type: string
 *                         example: "janedoe"
 *                         description: The username of the user who created the event.
 *       400:
 *         description: Bad request, unable to retrieve events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       401:
 *         description: Unauthorized, authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Authentication required"
 */

router.get("/eventsFollwers", isAuth, getFollowedUserEventsHandler);

export default router;
