import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../errors/cutsom-error";

export class BaseErrorHandler {
  errorHandlerMiddleware = (err: Error, req:Request, res:Response, next:NextFunction) => {
    if (err instanceof CustomAPIError) {
      return res.status(err.statusCode).json({ msg: err.message });
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Something went wrong try again later");
  };
}
