import { Router } from "express";
import { createNotificationHandler } from "../controllers/notification.controller";
import { isAuth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/notifications", isAuth, createNotificationHandler);

export default router;
