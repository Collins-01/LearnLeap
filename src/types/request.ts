import { Request } from "express";
import { IUser } from "../user/user";

export interface RequestWithUser extends Request {}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
