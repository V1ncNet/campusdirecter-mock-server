import { Request, Response } from 'express';
import { controller, get } from '../../../lib/web/bind/annotations';
import { InternalServerError, NotFoundError } from '../../../lib/http';
import { Controller } from '../../../lib/web';
import { studentRepository } from '../../../index';
import { Student, StudentId } from '../model/student';
import { authorized } from '../../security/app';

@controller('/student')
export default class StudentController extends Controller {
  @get('/', authorized)
  get(req: Request, res: Response) {
    const id: StudentId = String(res.locals.user.username);
    if (typeof res.locals.user?.username !== 'string' || !id) {
      throw new InternalServerError('JWT payload expected to contain data but none were provided', req);
    }

    const student: Student = studentRepository.retrieve(id);

    if (!student) {
      throw new NotFoundError(`Cannot GET /student/${id}`, req);
    }

    return res.json(student);
  }
}
