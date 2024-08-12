import { Router } from "express";
import authRoute from "./auth.routes";
import eventRoute from "./event.routes";
import { isAuth } from "../middlewares/auth.middleware";

const router = Router();

router.use("/auth", authRoute);
router.use("/event", eventRoute);

export default router;
