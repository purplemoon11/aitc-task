import { Router } from "express";
import {
  followUserHandler,
  getFollowedUserEventsHandler,
} from "../controllers/follow.controller";
import { isAuth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/followers", isAuth, followUserHandler);

router.get("/following", isAuth, getFollowedUserEventsHandler);

export default router;
