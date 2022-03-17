import { UserDetails } from './user-details';

export interface UserRepository {
  retrieve(username: string): UserDetails | undefined;
}
