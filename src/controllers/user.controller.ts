import { Request, Response, NextFunction } from "express";
import { loginUser, registerUser } from "../services/user.services";
import { successCallback } from "../utils/successResponse";
import { loginSchema, registrationSchema } from "../validators/auth.validator";

export const registerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = registrationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "fail",
        message: error.details[0].message,
      });
    }
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
        message: "User with that email already exists",
      });
    }
    next(error);
  }
};

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "fail",
        message: error.details[0].message,
      });
    }
    const result = await loginUser(req.body);

    successCallback(
      res,
      "success",
      "UserLogin",
      "User Logged In Successfully !!!",
      result
    );
  } catch (error: any) {
    if (error.message.includes("incorrect")) {
      return res.status(401).json({
        status: "fail",
        message: error.message,
      });
    }

    if (error.message.includes("required")) {
      return res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
    next(error);
  }
};
