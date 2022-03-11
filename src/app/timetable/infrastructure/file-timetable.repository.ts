import path from 'path';
import { StudentId } from '../../student/model';
import { assertState } from '../../../lib/common';
import { Timetable, TimetableRepository } from '../model';

export class FileTimetableRepository implements TimetableRepository {
  private _storage;

  constructor() {
    const file = path.resolve(process.cwd(), 'data', 'timetable.json');
    this._storage = require(file);
  }

  retrieve(studentId: StudentId): Timetable {
    const timetables = this.list().filter(element => element.owner.id == studentId);
    assertState(timetables.length < 2, "Something went wrong and there's nothing you can do 😕");
    return timetables[0];
  }

  private list(): Timetable[] {
    return this._storage.timetables;
  }
}
