import { Request, Response } from "express";
import { createNotification } from "../services/notification.service";

export const createNotificationHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId, type, message } = req.body;

    if (!userId || !type || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const notification = await createNotification(userId, type, message);

    res.status(201).json({
      status: "success",
      message: "Notification created successfully",
      data: notification,
    });
  } catch (error: any) {
    console.error("Error creating notification:", error);
    res.status(500).json({ message: error.message });
  }
};
