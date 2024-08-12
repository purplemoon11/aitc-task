import { Request } from "express";
import { User } from "../entities/user.entity";

interface IRequestWithUser<P, Q, R, S> extends Request<P, Q, R, S> {
  user?: User;
}
