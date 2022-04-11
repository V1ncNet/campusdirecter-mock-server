import { Request, Response } from 'express';
import { InternalServerError, NotFoundError } from '../../../lib/http';
import { Controller } from '../../../lib/web';
import { controller, get } from '../../../lib/web/bind/annotations';
import { timetableRepository } from '../../../index';
import { authorized } from '../../security/app';

@controller('/timetable')
export default class TimetableController extends Controller {
  @get('', authorized)
  get(req: Request, res: Response) {
    const studentId = String(res.locals.user.username);
    if (typeof res.locals.user?.username !== 'string' || !studentId) {
      throw new InternalServerError('JWT payload expected to contain data but none were provided', req);
    }

    const timetable = timetableRepository.retrieve(studentId);
    if (!timetable) {
      throw new NotFoundError(`Counld not find any results for query [studentId=${studentId}]`, req);
    }

    return res.json(timetable);
  }
}
