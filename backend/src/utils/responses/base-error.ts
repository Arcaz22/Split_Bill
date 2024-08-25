import { StatusCodes } from "http-status-codes";

export class BaseError<T> extends Error {
  statusCode: StatusCodes;
  details?: T;

  constructor(statusCode: StatusCodes, message: string, details?: T) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;

    Object.setPrototypeOf(this, BaseError.prototype);
  }
}
