/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Application } from 'express';
import { ControllerClass, Route } from '../web';
import controllers from '../../app';

export class Router {

    constructor(private _controllers: ControllerClass[]) { }

    public static async create(): Promise<Router> {
        const controllerClasses = await controllers();
        return new Router(controllerClasses);
    }

    public static noop(): Router {
        return new Router([]);
    }

    public route(app: Application): void {
        if (this._controllers.length <= 0) {
            console.debug('No controller associated with this router');
            return;
        }

        this._controllers.forEach((controller) => {
            // @ts-ignore
            const instance = new controller();
            instance.routes.forEach((route: Route) => {
                const { fnName, method, url, middleware } = route;
                // @ts-ignore
                app[method](url, middleware, instance[fnName]);
            });
        });
    }
}
