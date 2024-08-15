import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Event } from "./events.entity";

@Entity()
export class UserLikes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event) => event.userlikes)
  event: Event;

  @ManyToOne(() => User, (user) => user.userLikes)
  user: User;
}
