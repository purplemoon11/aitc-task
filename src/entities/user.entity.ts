import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Event } from "./events.entity";
import { Comment } from "./comment.entity";
import { UserLikes } from "./like.entity";
import { Follow } from "./follow.entity";
import { Notification } from "./notification.entity";

@Entity({ name: "User" })
export class User {
  @PrimaryGeneratedColumn({ name: "UserId", type: "bigint" })
  userId: number;

  @Column({ name: "Name", type: "varchar", length: 200 })
  name: string;

  @Column({ name: "UserName", type: "varchar", length: 30, nullable: false })
  userName: string;

  @Column({ name: "Phone", type: "varchar", length: 10 })
  phone: string;

  @Column({ name: "Email", type: "varchar", length: 100, nullable: false })
  email: string;

  @Column({
    name: "Password",
    type: "varchar",
    length: 255,
    nullable: false,
  })
  password: string;

  @OneToMany(() => Event, (events) => events.user)
  events: Event;

  @OneToMany(() => Comment, (commnet) => commnet.user)
  comment: Comment;

  @OneToMany(() => UserLikes, (userLikes) => userLikes.user)
  userLikes: UserLikes[];

  @OneToMany(() => Follow, (follow) => follow.following)
  following: Follow[];

  @OneToMany(() => Follow, (follow) => follow.follower)
  followers: Follow[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notification: Notification[];
}
