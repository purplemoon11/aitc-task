import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("Notifications")
export class Notification {
  @PrimaryGeneratedColumn({ name: "NotificationId" })
  notificationId: number;

  @Column({ name: "Type", type: "varchar", length: 50 })
  type: string;

  @Column({ name: "Message", type: "text" })
  message: string;

  @Column({ name: "Read", type: "boolean", default: false })
  read: boolean;

  @CreateDateColumn({ name: "CreatedAt" })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.notification)
  user: User;
}
