import { Router } from "express";
import {
  createEventHandler,
  listEvents,
} from "../controllers/event.controller";
import { isAuth } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @openapi
 * /createEvents:
 *   post:
 *     summary: Create a new event
 *     description: Creates a new event and associates it with the specified user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Summer Music Festival"
 *               description:
 *                 type: string
 *                 example: "A fun-filled summer music festival featuring various artists."
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-08-15"
 *               time:
 *                 type: string
 *                 format: time
 *                 example: "18:00:00"
 *               location:
 *                 type: string
 *                 example: "Central Park, NY"
 *               image:
 *                 type: string
 *                 example: "http://example.com/image.jpg"
 *               category:
 *                 type: string
 *                 example: "Music"
 *               userId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 eventId:
 *                   type: number
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Summer Music Festival"
 *                 description:
 *                   type: string
 *                   example: "A fun-filled summer music festival featuring various artists."
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: "2024-08-15"
 *                 time:
 *                   type: string
 *                   format: time
 *                   example: "18:00:00"
 *                 location:
 *                   type: string
 *                   example: "Central Park, NY"
 *                 image:
 *                   type: string
 *                   example: "http://example.com/image.jpg"
 *                 category:
 *                   type: string
 *                   example: "Music"
 *                 user:
 *                   type: number
 *                   example: 1
 *       400:
 *         description: Bad request, missing required fields or invalid user
 *       404:
 *         description: User not found
 */
router.post("/createEvents", isAuth, createEventHandler);

/**
 * @openapi
 * /getEvents:
 *   get:
 *     summary: Get a list of events
 *     description: Retrieves a list of events based on the provided filter options.
 *     parameters:
 *       - name: category
 *         in: query
 *         description: Filter events by category
 *         required: false
 *         schema:
 *           type: string
 *       - name: date
 *         in: query
 *         description: Filter events by date
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *       - name: search
 *         in: query
 *         description: Search events by title or description
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of events matching the filter criteria
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
 *                   title:
 *                     type: string
 *                     example: "Summer Music Festival"
 *                   description:
 *                     type: string
 *                     example: "A fun-filled summer music festival featuring various artists."
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: "2024-08-15"
 *                   time:
 *                     type: string
 *                     format: time
 *                     example: "18:00:00"
 *                   location:
 *                     type: string
 *                     example: "Central Park, NY"
 *                   image:
 *                     type: string
 *                     example: "http://example.com/image.jpg"
 *                   category:
 *                     type: string
 *                     example: "Music"
 *       400:
 *         description: Bad request, invalid filter options
 *       500:
 *         description: Internal server error
 */
router.get("/getEvents", isAuth, listEvents);

export default router;
