import {
  Entity,
  ManyToOne,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Event } from "./events.entity";

@Entity("UserLikes")
export class UserLikes {
  @PrimaryColumn({ name: "UserId", type: "bigint" })
  userId: number;

  @PrimaryColumn({ name: "EventId", type: "bigint" })
  eventId: number;

  @ManyToOne(() => User, (user) => user.userLikes, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Event, (event) => event.userlikes, { onDelete: "CASCADE" })
  event: Event;

  @CreateDateColumn({ name: "CreatedAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "UpdatedAt" })
  updatedAt: Date;
}
