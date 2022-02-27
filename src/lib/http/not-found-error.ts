import { Request } from 'express';
import { HttpError } from './http-error';

export class NotFoundError extends HttpError {

    status = 404;
    error = 'Not Found';

    constructor(error: Error | string, req?: Request) {
        super(error, req);
    }
}
