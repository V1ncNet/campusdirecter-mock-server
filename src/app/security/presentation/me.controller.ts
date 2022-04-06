import { Request, Response } from 'express';
import { Controller } from '../../../lib/web';
import { controller, get } from '../../../lib/web/bind/annotations';
import { authorized } from '../app';

@controller('/me')
export default class MeController extends Controller {
  @get('', authorized)
  authorize(req: Request, res: Response) {
    return res.json(res.locals.user);
  }
}
