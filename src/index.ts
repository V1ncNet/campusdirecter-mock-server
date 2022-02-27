import Server from './app/server';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

Server.create().then(server => {
    server.app.set('json spaces', 2);
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));

    if (process.env.NODE_ENV === 'development') {
        server.use(morgan('dev'));
        server.use(cors());
    }

    if (process.env.NODE_ENV === 'production') {
        server.use(helmet());
    }

    server.start();
});
