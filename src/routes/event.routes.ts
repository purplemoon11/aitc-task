import { Router } from "express";
import {
  createEventHandler,
  listEvents,
} from "../controllers/event.controller";
import { isAuth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/createEvents", isAuth, createEventHandler);
router.get("/getEvents", isAuth, listEvents);

export default router;
