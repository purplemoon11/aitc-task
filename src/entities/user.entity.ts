import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import bcrypt from "bcryptjs";

@Entity({ name: "User" })
export class User {
  @PrimaryGeneratedColumn({ name: "UserId", type: "bigint" })
  userId: number;

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
}
