import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../errors/cutsom-error";

export default class BaseErrorHandler {
  errorHandlerMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (err instanceof CustomAPIError) {
      console.log(`CUSTOM API EROR::::: ${err}`);
      return res.status(400).json({ msg: err.message });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong try again later",
    });
  };
}
