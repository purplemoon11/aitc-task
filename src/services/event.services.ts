import { User } from "../entities/user.entity";
import { Event } from "../entities/events.entity";
import { AppDataSource } from "../configs/database";
import { FilterOptions, IEvent } from "../constants/interface";
import { Comment } from "../entities/comment.entity";
import { UserLikes } from "../entities/like.entity";

const userRepository = AppDataSource.getRepository(User);
const eventRepository = AppDataSource.getRepository(Event);
const commentRepository = AppDataSource.getRepository(Comment);
const userLikesRepository = AppDataSource.getRepository(UserLikes);

/**
 * Creates the event
 * @param data - Takes event data to create user
 * @param userId - Takes userId to create event
 * @returns - Promise of event
 */
export const createEvent = async (data: IEvent, userId: number) => {
  try {
    const user = await userRepository.findOne({ where: { userId } });
    if (!user) {
      throw new Error("User not found");
    }

    const event = eventRepository.create({
      ...data,
      user,
    });

    await eventRepository.save(event);
    return event;
  } catch (error: any) {
    throw new Error(`Failed to create event: ${error.message}`);
  }
};

/**
 * Filters data to get all events
 *
 * @param filters - Takes data to be filtered
 * @returns - Promises of event
 */
export const getEvents = async (filters: FilterOptions) => {
  try {
    const query = eventRepository.createQueryBuilder("event");

    if (filters.category) {
      query.andWhere("event.category = :category", {
        category: filters.category,
      });
    }

    if (filters.date) {
      query.andWhere("event.date = :date", { date: filters.date });
    }

    if (filters.search) {
      query.andWhere(
        "event.title ILIKE :search OR event.description ILIKE :search",
        { search: `%${filters.search}%` }
      );
    }

    const events = await query.getMany();
    return events;
  } catch (error: any) {
    throw new Error(error);
  }
};

/**
 * This function return the data according to it's id
 *
 * @param eventId - Takes eventId to list the view data
 * @returns - Promise of event
 */
export const getEventDetailsById = async (eventId: number) => {
  try {
    const event = await eventRepository.findOne({
      where: { eventId: eventId },
      relations: ["user", "comment", "comment.user"],
    });

    if (!event) {
      throw new Error("Event not found");
    }

    return event;
  } catch (error: any) {
    throw new Error(error);
  }
};

/**
 * This function is to count and store the amount of likes from user for the event
 *
 * @param eventId - Takes eventId to find the event to like
 * @param userId - Takes userId to count the like
 * @returns - Promise of number
 */
export const likeEventService = async (eventId: number, userId: number) => {
  try {
    const event = await eventRepository.findOne({ where: { eventId } });

    if (!event) {
      throw new Error("Event not found");
    }

    const user = await userRepository.findOne({ where: { userId } });

    if (!user) {
      throw new Error("User not found");
    }
    const userLike = await userLikesRepository.findOne({
      where: {
        event: { eventId },
        user: { userId },
      },
    });

    if (userLike) {
      throw new Error("You have already liked this event");
    }

    const newUserLike = new UserLikes();
    newUserLike.event = event;
    newUserLike.user = user;
    await userLikesRepository.save(newUserLike);
    event.likes += 1;
    await eventRepository.save(event);
    return event.likes;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * This function takes argument to add comment
 *
 * @param eventId - EventId to post comment
 * @param content - Content to be added to post comment
 * @param userId - Takes userId to post commnet on the event
 * @returns - Promise of comment
 */
export const addCommentToEvent = async (
  eventId: number,
  content: string,
  userId: number
) => {
  try {
    const event = await eventRepository.findOne({ where: { eventId } });
    if (!event) {
      throw new Error("Event not found");
    }

    const user = await userRepository.findOne({ where: { userId } });
    if (!user) {
      throw new Error("User not found");
    }

    const comment = new Comment();
    comment.content = content;
    comment.event = event;
    comment.user = user;

    return await commentRepository.save(comment);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
