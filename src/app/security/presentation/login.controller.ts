import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { userRepository } from '../../../index';
import { BadRequest } from '../../../lib/http';
import { Controller } from '../../../lib/web';
import { controller, post } from '../../../lib/web/bind/annotations';
import { UserDetails } from '../model';
import { JWT_SECRET } from '../app';

@controller('/login')
export default class LoginController extends Controller {
  @post('')
  login(req: Request, res: Response) {
    const { username, password } = req.body;
    const user = userRepository.retrieve(username);

    if (!user) {
      throw new BadRequest('Invalid username or password');
    }

    if (password !== user.password) {
      throw new BadRequest('Invalid username or password');
    }

    const token = LoginController.generateToken(user);
    return res.json({
      token,
    });
  }

  static generateToken(user: UserDetails): string {
    const data = { username: user.username };

    const signature = JWT_SECRET;
    const expiresIn = '6h';

    const token = sign({ data }, signature, { expiresIn });
    return token;
  }
}
