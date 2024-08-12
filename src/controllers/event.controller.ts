import { Request, Response } from "express";
import { createEvent, getEvents } from "../services/event.services";
import { IRequestWithUser } from "../utils/type";
import { successCallback } from "../utils/successResponse";

export const createEventHandler = async (
  req: IRequestWithUser<any, any, any, any>,
  res: Response
) => {
  try {
    const userId = Number(req.user?.userId);
    const event = await createEvent(req.body, userId);

    successCallback(
      res,
      "success",
      "EventCreation",
      "Event created successfully !!!",
      event
    );
  } catch (error: any) {
    if (error.message === "Failed to create event") {
      return res.status(401).json({
        status: "fail",
        message: error.message,
      });
    }
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
