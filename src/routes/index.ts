import { Router } from "express";
import authRoute from "./auth.routes";
import eventRoute from "./event.routes";
import followRoute from "./follow.routes";

const router = Router();

router.use("/auth", authRoute);
router.use("/event", eventRoute);
router.use("/follow", followRoute);

export default router;
