import { Request } from 'express';
import { HttpError } from './http-error';

export class Unauthorized extends HttpError {
  status = 401;
  error = 'Unauthorized';

  constructor(error: Error | string, req?: Request) {
    super(error, req);
  }
}
