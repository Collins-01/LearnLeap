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
   

    return res.status(500).json({ msg: err.message });
  };
}
