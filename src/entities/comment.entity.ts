import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Event } from "./events.entity";
import { User } from "./user.entity";

@Entity("Comment")
export class Comment {
  @PrimaryGeneratedColumn({ name: "CommentId", type: "bigint" })
  commentId: number;

  @Column({ name: "Content", type: "text" })
  content: string;

  @ManyToOne(() => Event, (event) => event.comment)
  event: Event;

  @ManyToOne(() => User, (user) => user.comment)
  user: User;
}
