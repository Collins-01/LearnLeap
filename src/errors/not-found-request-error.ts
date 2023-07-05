import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "./cutsom-error";

export class NotFoundRequestError extends CustomAPIError {
  statusCode: number;
  constructor(message: any) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
