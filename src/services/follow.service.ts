import { User } from "../entities/user.entity";
import { Follow } from "../entities/follow.entity";
import { AppDataSource } from "../configs/database";
import { Event } from "../entities/events.entity";
import { In } from "typeorm";
import AppError from "../utils/appError";

const userRepository = AppDataSource.getRepository(User);
const followRepository = AppDataSource.getRepository(Follow);
const eventRepository = AppDataSource.getRepository(Event);

/**
 * This function is to follow the user
 *
 * @param followerId - Takes userId to know the user
 * @param followedId - Takes userId to know the user
 */
export const followUser = async (followerId: number, followedId: number) => {
  try {
    const follower = await userRepository.findOne({
      where: { userId: followerId },
    });
    const following = await userRepository.findOne({
      where: { userId: followedId },
    });

    if (!follower || !following) {
      throw new Error("User not found");
    }

    const existingFollow = await followRepository.findOne({
      where: {
        follower: follower,
        following: following,
      },
    });

    if (existingFollow) {
      throw new Error("Already following this user");
    }

    const follow = new Follow();
    follow.follower = follower;
    follow.following = following;

    await followRepository.save(follow);
  } catch (error: any) {
    throw new AppError(400, error.message);
  }
};

/**
 * Function to view the list of events followed by the user
 *
 * @param userId - Takes userId of the user
 * @returns - Promise of user
 */
export const getEventsFromFollowedUsers = async (userId: number) => {
  try {
    const user = await userRepository.findOne({
      where: { userId },
      relations: ["following", "following.following"],
    });

    if (!user) {
      throw new Error("User not found");
    }

    const followedUserIds = user.following
      .map((follow) => follow.following?.userId)
      .filter((id) => id !== undefined);

    const followingUserIds = user.following
      .map(() => userId)
      .filter((id) => id !== undefined);

    if (followedUserIds.length === 0 && followingUserIds.length === 0) {
      console.log("No followed or following users found.");
      return { followedUsers: [], followingUsers: [], events: [] };
    }

    const events = await eventRepository.find({
      where: { user: In(followedUserIds) },
      relations: ["user"],
    });

    const followedUsers = await userRepository.find({
      where: { userId: In(followedUserIds) },
    });

    const followingUsers = await userRepository.find({
      where: { userId: In(followingUserIds) },
    });

    return {
      followedUsers,
      followingUsers,
      events,
    };
  } catch (error: any) {
    throw new AppError(400, error.message);
  }
};
