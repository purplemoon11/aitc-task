import { TokenExpiredError, verify } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import env from "../configs/env";
import { User } from "../entities/user.entity";
import { IRequestWithUser } from "../utils/type";
import AppError from "../utils/appError";
import { AppDataSource } from "../configs/database";

const userRepository = AppDataSource.getRepository(User);

export const isAuth = async (
  req: IRequestWithUser<any, any, any, any>,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    const accessToken = authHeader?.split(" ")[1];

    if (!accessToken) {
      return next(new AppError(401, "Unauthorized access! Token is missing."));
    }

    const payload = verify(accessToken, env.jwtTokenSecret as string, {
      ignoreExpiration: false,
    });

    if (!payload) {
      return next(new AppError(401, "Invalid token!"));
    }

    const user = await userRepository.findOne({
      where: {
        userId: (payload as any).userId,
      },
    });

    if (!user) {
      return next(new AppError(401, "User not found!"));
    }

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return next(new AppError(401, "Token has expired!"));
    }
    return next(new AppError(401, "Authentication failed!"));
  }
};
