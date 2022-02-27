import express, { Application, RequestHandler } from 'express';
import http from 'http';
import { Router } from '../lib/web';

export default class Server {

    private readonly _app: Application;
    private readonly _server: http.Server;
    private readonly _middleware: RequestHandler[];
    private _port: number | string;
    private _router: Router;

    constructor(router: Router = Router.noop()) {
        this._app = express();
        this._server = http.createServer(this._app);
        this._middleware = [];
        this._port = process.env.SERVER_PORT || 3000;
        this._router = router;
    }

    public static async create(): Promise<Server> {
        const router = await Router.create();
        return new Server(router);
    }

    public get app(): Application {
        return this._app;
    }

    public use(...middleware: RequestHandler[]): void {
        this._middleware.push(...middleware);
    }

    public start(): void {
        this.route();
        this.listen();
    }

    private route(): void {
        this._app.use(this._middleware);
        this._router.route(this._app);
    }

    private listen(): void {
        this._server.listen(this._port, () => {
            console.log(`Express started on port ${this._port} 🚀`);
        });
    }

    public shutdown(signal: string, value: number): void {
        this._server.close(() => {
            console.debug(` Trapped signal ${signal}`);
            console.log('Server is shutting down. Bye 👋');
            process.exit(128 + value);
        });
    }
}
