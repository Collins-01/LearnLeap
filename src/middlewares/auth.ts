import { NextFunction, Response, Request } from "express";
import * as jwt from "jsonwebtoken";
import { RequestWithUser } from "../types/request";
import { BadRequestError, UnauthenticatedError } from "../errors";
import UsersService from "../user/user.service";

async function authMiddleware(
  request: Request,
  _: Response,
  next: NextFunction
) {
  const requestWithUser = request as RequestWithUser;

  const cookies = requestWithUser.cookies;
  if (!cookies?.Authorization) {
    next(new UnauthenticatedError("No token found for this request"));
  }

  try {
    const usersService = new UsersService();

    const userId = "userId";

    const user = await usersService.getUserById(userId);
    if (!user) {
      next(new BadRequestError("Wrong credentials!"));
    } else {
      requestWithUser.user = user;
      next();
    }
  } catch (_) {
    next(new BadRequestError("Wrong credentials!"));
  }
}

export default authMiddleware;
