import { Request, Response } from 'express';
import { controller, get } from '../../../lib/web/bind/annotations';
import { NotFoundError } from '../../../lib/http';
import { Controller } from '../../../lib/web';
import { studentRepository } from '../../../index';
import { Student, StudentId } from '../model/student';

@controller('/student')
export default class StudentController extends Controller {
  @get('/:id')
  get(req: Request, res: Response) {
    const id: StudentId = String(req.params.id);
    const student: Student = studentRepository.retrieve(id);

    if (!student) {
      throw new NotFoundError(`Cannot GET /student/${id}`, req);
    }

    return res.json(student);
  }
}
