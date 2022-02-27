import express, { Application } from 'express';
import http from 'http';

export default class Server {

    private readonly _app: Application;
    private readonly _server: http.Server;
    private _port: number | string;

    constructor() {
        this._app = express();
        this._server = http.createServer(this._app);
        this._port = process.env.SERVER_PORT || 3000;
    }

    public static async create(): Promise<Server> {
        return new Server();
    }

    public get app(): Application {
        return this._app;
    }

    public start(): void {
        this.listen();
    }

    private listen(): void {
        this._server.listen(this._port, () => {
            console.log(`Express started on port ${this._port} 🚀`);
        });
    }
}
