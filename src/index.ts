import Server from './app/server';

Server.create().then(server => {
    server.start();
});
