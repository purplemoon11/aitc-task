import { Request, Response, NextFunction } from "express";
import { loginUser, registerUser } from "../services/user.services";
import { successCallback } from "../utils/successResponse";

export const registerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await registerUser(req.body);

    successCallback(
      res,
      "success",
      "UserRegistration",
      "User Created Successfully !!!",
      user
    );
  } catch (error: any) {
    if (error.code === "23505") {
      return res.status(409).json({
        status: "fail",
        message: "User with that email already exist",
      });
    }
    console.log({ error });

    next(error);
  }
};

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await loginUser(req.body);

    successCallback(
      res,
      "success",
      "UserLogin",
      "User Logged In Successfully !!!",
      result
    );
  } catch (error: any) {
    if (error.message === "Login failed. Please check your credentials.") {
      return res.status(401).json({
        status: "fail",
        message: error.message,
      });
    }

    if (error.message === "Email and password are required") {
      return res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }

    console.error("Login Error:", error);
    next(error);
  }
};
