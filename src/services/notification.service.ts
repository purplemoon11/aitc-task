import { AppDataSource } from "../configs/database";
import { Notification } from "../entities/notification.entity";
import { User } from "../entities/user.entity";

const notificationRepository = AppDataSource.getRepository(Notification);
const userRepository = AppDataSource.getRepository(User);

export const createNotification = async (
  userId: number,
  type: string,
  message: string
) => {
  const user = await userRepository.findOne({ where: { userId: userId } });

  if (!user) {
    throw new Error(`User with ID ${userId} not found`);
  }
  const notification = new Notification();
  notification.user = user;
  notification.type = type;
  notification.message = message;

  return await notificationRepository.save(notification);
};
