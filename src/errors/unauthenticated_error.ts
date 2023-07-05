import { CustomAPIError } from "./cutsom-error";
const { StatusCodes } = require("http-status-codes");

export class UnauthenticatedError extends CustomAPIError {
  statusCode: number;
  constructor(message: any) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}
