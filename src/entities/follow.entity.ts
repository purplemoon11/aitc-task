import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.following, { eager: true })
  following: User;

  @ManyToOne(() => User, (user) => user.followers, { eager: true })
  follower: User;
}
