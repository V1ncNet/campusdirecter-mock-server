import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { Unauthorized } from '../../../lib/http';
import { JWT_SECRET } from './constants';

const extractToken = (req: Request) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }

  return undefined;
};

export default (req: Request, res: Response, next: NextFunction) => {
  const token = extractToken(req) as string;

  try {
    const jwtPayload: any = verify(token, JWT_SECRET);
    res.locals.user = jwtPayload.data;
  } catch (err) {
    throw new Unauthorized('JWT is invalid');
  }

  return next();
};
