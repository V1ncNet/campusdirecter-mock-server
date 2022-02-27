/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Route } from './route';

export abstract class Controller {

    // @ts-ignore
    protected _routes: Route[];

    public get routes(): Route[] {
        if (!this._routes) {
            console.debug('No routes defined');
            return [];
        }

        return this._routes;
    }
}

export type ControllerClass = typeof Controller;
