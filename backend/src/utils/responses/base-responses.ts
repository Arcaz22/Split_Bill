import { StatusCodes } from "http-status-codes";

export class BaseResponses<T> {
  statusCode?: StatusCodes;
  message?: string;
  data?: T;

  constructor(statusCode?: StatusCodes, message?: string, data?: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
