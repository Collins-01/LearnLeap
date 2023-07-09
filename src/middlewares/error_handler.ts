import { NextFunction, Request, Response } from "express";
import HttpException from "../errors/base-http-exception";

function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof HttpException) {
    return response.status(error.status).json({
      message: error.message,
    });
  }

  const status = 500;
  const message = "Something went wrong";
  return response.status(status).json({
    status,
    message,
  });
}

export default errorMiddleware;
