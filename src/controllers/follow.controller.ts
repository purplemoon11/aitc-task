import {
  followUser,
  getEventsFromFollowedUsers,
} from "../services/follow.service";
import { Response } from "express";
import { IRequestWithUser } from "../utils/type";

export const followUserHandler = async (
  req: IRequestWithUser<any, any, any, any>,
  res: Response
) => {
  const { followedId } = req.body;
  const followerId = Number(req.user?.userId);

  try {
    await followUser(followerId, followedId);
    res.status(200).json({ message: "Followed successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getFollowedUserEventsHandler = async (
  req: IRequestWithUser<any, any, any, any>,
  res: Response
) => {
  const userId = Number(req.user?.userId);

  try {
    const { followedUsers, events } = await getEventsFromFollowedUsers(userId);
    res.status(200).json({
      followedUsers,
      events,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
