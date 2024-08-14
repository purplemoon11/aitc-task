import { User } from "../entities/user.entity";
import { Follow } from "../entities/follow.entity";
import { AppDataSource } from "../configs/database";
import { Event } from "../entities/events.entity";
import { In } from "typeorm";

const userRepository = AppDataSource.getRepository(User);
const followRepository = AppDataSource.getRepository(Follow);
const eventRepository = AppDataSource.getRepository(Event);

export const followUser = async (followerId: number, followedId: number) => {
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
};

export const getEventsFromFollowedUsers = async (userId: number) => {
  const user = await userRepository.findOne({
    where: { userId: userId },
    relations: ["following"],
  });

  if (!user) {
    throw new Error("User not found");
  }

  const followedUserIds = user.following.map(
    (follow) => follow.following.userId
  );

  const events = await eventRepository.find({
    where: { user: In(followedUserIds) },
    relations: ["user"],
  });

  return events;
};
