import { Router } from "express";
import authRoute from "./auth.routes";
import eventRoute from "./event.routes";
import followRoute from "./follow.routes";
import notificationRoute from "./notification.routes";

const router = Router();

router.use("/auth", authRoute);
router.use("/event", eventRoute);
router.use("/follow", followRoute);
router.use("/notification", notificationRoute);

export default router;
