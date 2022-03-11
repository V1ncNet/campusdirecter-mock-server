import { Student, StudentId } from '../model/student';
import { StudentRepository } from '../model';
import { assertState } from '../../../lib/common';
import path from 'path';

export class FileStudentRepository implements StudentRepository {
  private _storage;

  constructor() {
    const file = path.resolve(process.cwd(), 'data', 'student.json');
    this._storage = require(file);
  }

  retrieve(id: StudentId): Student {
    const students = this.list().filter(element => element.id == id);
    assertState(students.length < 2, "Something went wrong and there's nothing you can do 😕");
    return students[0];
  }

  list(): Student[] {
    return this._storage.students;
  }
}
