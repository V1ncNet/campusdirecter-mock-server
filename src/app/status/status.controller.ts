import { Request, Response } from 'express';
import { controller, get } from '../../lib/web/bind/annotations';
import { Controller } from '../../lib/web';

@controller('')
export default class StatusController extends Controller {

    @get('/')
    status(req: Request, res: Response) {
        return res.send('Server is running\n');
    }
}
