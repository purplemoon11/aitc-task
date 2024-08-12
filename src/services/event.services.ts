import { User } from "../entities/user.entity";
import { Event } from "../entities/events.entity";
import { AppDataSource } from "../configs/database";
import { FilterOptions, IEvent } from "../constants/interface";

const userRepository = AppDataSource.getRepository(User);
const eventRepository = AppDataSource.getRepository(Event);

export const createEvent = async (data: IEvent, userId: number) => {
  try {
    const user = await userRepository.findOne({ where: { userId: userId } });
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
    throw new Error(error);
  }
};

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
