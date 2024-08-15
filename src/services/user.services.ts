import { AppDataSource } from "../configs/database";
import env from "../configs/env";
import { ILoginData, IUser } from "../constants/interface";
import { User } from "../entities/user.entity";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(User);

/**
 * This function resgiters and creates user
 *
 * @param registrationData - Sets data to register user
 * @returns Prmoise of user
 */
export const registerUser = async (registrationData: IUser) => {
  try {
    const { name, email, phone, userName, password } = registrationData;

    if (!name || !email || !phone || !userName || !password) {
      throw new Error("All fields are required.");
    }

    const userExists = await userRepository.findOneBy({ email: email });
    if (userExists) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({
      name,
      email,
      phone,
      userName,
      password: hashedPassword,
    });
    const userData = await userRepository.save(user);
    return userData;
  } catch (error: any) {
    throw new Error(error);
  }
};

/**
 * This function login's the user
 *
 * @param loginData - Takes email and password to login
 * @returns - Promise of user
 */
export const loginUser = async (loginData: ILoginData) => {
  const { email, password } = loginData;
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  try {
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error("The email or password you entered is incorrect");
    }

    const hash = user.password;
    const verify = await bcrypt.compare(password, hash);

    if (!verify) {
      throw new Error("The email or password you entered is incorrect");
    } else {
      const payload = { id: user.userId };
      const secretKey = env.jwtTokenSecret || "";
      const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

      const { password, ...userData } = user;

      return { verify, token, data: userData };
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

/**
 * This function finds user according to it's id
 *
 * @param userId - Takes id of the user
 * @returns - Promise of user or null
 */
export const findByIdUser = async (userId: number) => {
  try {
    const user = await userRepository.findOne({ where: { userId: userId } });
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
};
