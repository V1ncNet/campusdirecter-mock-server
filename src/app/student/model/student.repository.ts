import { Student, StudentId } from './student';

export interface StudentRepository {
  retrieve(id: StudentId): Student | undefined;

  list(): Student[];
}
