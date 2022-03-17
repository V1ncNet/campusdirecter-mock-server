import { assertState } from '../../../lib/common';
import { UserDetails, UserRepository } from '../model';

export class DummyUserRepository implements UserRepository {
  private _storage: UserDetails[] = [{ username: '0815421337420', password: 'nice' }];

  retrieve(username: string): UserDetails | undefined {
    const users = this.list().filter(user => user.username === username);
    assertState(users.length < 2, "Something went wrong and there's nothing you can do 😕");
    return users[0];
  }

  private list() {
    return this._storage;
  }
}
