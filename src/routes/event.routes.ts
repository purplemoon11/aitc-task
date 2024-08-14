import { Router } from "express";
import {
  addComment,
  createEventHandler,
  getEventDetails,
  likeEventHandler,
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

/**
 * @openapi
 * /events/{id}:
 *   get:
 *     summary: Retrieve event details
 *     description: Fetch detailed information about a specific event by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the event to retrieve.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Event details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 eventId:
 *                   type: integer
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
 *                   nullable: true
 *                   example: "http://example.com/image.jpg"
 *                 category:
 *                   type: string
 *                   example: "Music"
 *                 likes:
 *                   type: integer
 *                   example: 123
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: "john_doe"
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       commentId:
 *                         type: integer
 *                         example: 10
 *                       content:
 *                         type: string
 *                         example: "Great event! Looking forward to it."
 *                       user:
 *                         type: object
 *                         properties:
 *                           userId:
 *                             type: integer
 *                             example: 2
 *                           username:
 *                             type: string
 *                             example: "jane_smith"
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */

router.get("/events/:id", getEventDetails);

/**
 * @openapi
 * /events/{id}/comments:
 *   post:
 *     summary: Add a comment to an event
 *     description: Allows a user to add a comment to a specific event by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the event to comment on.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "This event sounds amazing! I can't wait to attend."
 *     responses:
 *       201:
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 commentId:
 *                   type: integer
 *                   example: 123
 *                 content:
 *                   type: string
 *                   example: "This event sounds amazing! I can't wait to attend."
 *                 event:
 *                   type: object
 *                   properties:
 *                     eventId:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Summer Music Festival"
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: integer
 *                       example: 2
 *                     username:
 *                       type: string
 *                       example: "jane_smith"
 *       400:
 *         description: Bad request, missing required fields or invalid event/user
 *       404:
 *         description: Event or user not found
 *       500:
 *         description: Server error
 */

router.post("/events/:id/comments", addComment);

/**
 * @openapi
 * /events/{id}/like:
 *   post:
 *     summary: Like an event
 *     description: Allows a user to like an event. Only one like per user is allowed per event.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the event to like.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Event liked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event liked"
 *                 likes:
 *                   type: integer
 *                   example: 101
 *       400:
 *         description: Bad request, invalid event ID or already liked
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid event ID" or "You have already liked this event"
 *       404:
 *         description: Event or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event not found" or "User not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error message"
 */

router.post("/events/:id/like", likeEventHandler);

export default router;
