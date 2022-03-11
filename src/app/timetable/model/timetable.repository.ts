import { StudentId } from 'src/app/student/model';
import { Timetable } from './timetable';

export interface TimetableRepository {
  retrieve(studentId: StudentId): Timetable | undefined;
}
