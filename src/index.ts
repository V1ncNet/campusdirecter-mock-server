import Server from './app/server';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

const signals: { [key: string]: number } = {
    'SIGINT': 2,
    'SIGTERM': 15
}

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

    Object.keys(signals).forEach(signal => {
        process.on(signal, () => {
            server.shutdown(signal, signals[signal]);
        })
    })
});
