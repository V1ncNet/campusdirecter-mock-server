import { Request, Response } from 'express';
import { NotFoundError } from '../../../lib/http';
import { Controller } from '../../../lib/web';
import { controller, get } from '../../../lib/web/bind/annotations';
import { timetableRepository } from '../../../index';

@controller('/timetable')
export default class TimetableController extends Controller {
  @get('')
  get(req: Request, res: Response) {
    let studentId = String(req.query.studentId);
    if (typeof req.query.studentId !== 'string' || !studentId) {
      studentId = '0815421337420';
    }

    const timetable = timetableRepository.retrieve(studentId);
    if (!timetable) {
      throw new NotFoundError(`Counld not find any results for query [studentId=${studentId}]`, req);
    }

    return res.json(timetable);
  }
}
