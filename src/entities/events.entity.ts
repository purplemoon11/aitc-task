import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./user.entity";
import { Comment } from "./comment.entity";
import { UserLikes } from "./like.entity";

@Entity("Event")
export class Event {
  @PrimaryGeneratedColumn({ name: "EventId", type: "bigint" })
  eventId: number;

  @Column({ name: "Title", type: "varchar", length: 200 })
  title: string;

  @Column({ name: "Description", type: "text" })
  description: string;

  @Column({ name: "Date", type: "date" })
  date: string;

  @Column({ name: "Time", type: "time" })
  time: string;

  @Column({ name: "Location", type: "varchar", length: 255 })
  location: string;

  @Column({ name: "Image", type: "varchar", length: 255, nullable: true })
  image?: string;

  @Column({ name: "Category", type: "varchar", length: 50 })
  category: string;

  @Column({ name: "Likes", type: "integer", default: 0 })
  likes: number;

  @ManyToOne(() => User, (user) => user.events)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.event)
  comment: Comment[];

  @OneToMany(() => UserLikes, (userlikes) => userlikes.event)
  userlikes: UserLikes[];
}
