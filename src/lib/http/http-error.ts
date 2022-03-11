import { Request } from 'express';
import { ErrorAttributes } from './error-attributes';

export abstract class HttpError implements Error, ErrorAttributes {
  name = 'HTTP Erorr';
  status = 500;
  error = 'Internal Server Error';
  message: string;
  path?: string;
  timestamp: string;

  protected constructor(error: Error | string, req?: Request) {
    if (error instanceof Error) {
      this.name = error.name;
      this.message = error.message;
    } else {
      this.message = error;
    }

    if (req) {
      this.path = req.path;
    }

    this.timestamp = new Date().toISOString();
  }
}
