import { Event } from "../entities/events.entity";
import { User } from "../entities/user.entity";

export interface FilterOptions {
  category?: string;
  date?: string;
  search?: string;
}

export interface IUser {
  userId: number;
  name: string;
  userName: string;
  phone: string;
  email: string;
  password: string;
  events?: Event[];
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IEvent {
  eventId: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image?: string;
  category: string;
  user: User;
}
