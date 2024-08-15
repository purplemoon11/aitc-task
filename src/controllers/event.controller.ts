import { NextFunction, Request, Response } from "express";
import {
  addCommentToEvent,
  createEvent,
  getEventDetailsById,
  getEvents,
  likeEventService,
} from "../services/event.services";
import { IRequestWithUser } from "../utils/type";
import { successCallback } from "../utils/successResponse";
import { createEventSchema } from "../validators/event.validator";
import { addCommentSchema } from "../validators/comment.validator";

export const createEventHandler = async (
  req: IRequestWithUser<any, any, any, any>,
  res: Response
) => {
  try {
    const { error } = createEventSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "fail",
        message: error.details[0].message,
      });
    }

    const userId = Number(req.user?.userId);
    if (!userId) {
      return res.status(401).json({
        status: "fail",
        message: "User not authenticated",
      });
    }
    const imageUrl = req.file ? req.file.filename : null;

    const eventData = { ...req.body, image: imageUrl };

    const event = await createEvent(eventData, userId);

    successCallback(
      res,
      "success",
      "EventCreation",
      "Event created successfully!",
      event
    );
  } catch (error: any) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const listEvents = async (req: Request, res: Response) => {
  try {
    const category =
      typeof req.query.category === "string" ? req.query.category : undefined;
    const date =
      typeof req.query.date === "string" ? req.query.date : undefined;
    const search =
      typeof req.query.search === "string" ? req.query.search : undefined;

    const filters = { category, date, search };

    const events = await getEvents(filters);

    successCallback(
      res,
      "success",
      "FetchEvent",
      "Event fetched successfully !!!",
      events
    );
  } catch (error: any) {
    if (error.message === "Failed to fetch event") {
      return res.status(401).json({
        status: "fail",
        message: error.message,
      });
    }
  }
};

export const getEventDetails = async (req: Request, res: Response) => {
  const eventId = Number(req.params.id);
  try {
    const event = await getEventDetailsById(eventId);
    return res.json(event);
  } catch (error: any) {
    if (error.message === "Event not found") {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: "Server error", error });
  }
};

export const likeEventHandler = async (
  req: IRequestWithUser<any, any, any, any>,
  res: Response
) => {
  try {
    const eventId = parseInt(req.params.eventId, 10);
    const userId = Number(req.user?.userId);

    if (isNaN(eventId)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }
    const likes = await likeEventService(eventId, userId);
    console.log(likes, "data");
    return res.status(200).json({ message: "Event liked", likes });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const addComment = async (
  req: IRequestWithUser<any, any, any, any>,
  res: Response
) => {
  try {
    const { error } = addCommentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "fail",
        message: error.details[0].message,
      });
    }

    const eventId = parseInt(req.params?.eventId, 10);
    if (isNaN(eventId)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }

    const { content } = req.body;
    const userId = Number(req.user?.userId);

    const comment = await addCommentToEvent(eventId, content, userId);

    res.status(201).json({
      status: "success",
      message: "Comment added successfully",
      comment,
    });
  } catch (error: any) {
    if (
      error.message.includes("Event not found") ||
      error.message.includes("User not found")
    ) {
      return res.status(404).json({
        status: "fail",
        message: error.message,
      });
    }

    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
