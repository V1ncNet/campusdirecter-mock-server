import { RequestOptions, request, IncomingMessage } from 'http';

const options: RequestOptions = {
  host: 'localhost',
  port: process.env.SERVER_PORT || 3000,
  timeout: 2000,
};

const req = request(options, (res: IncomingMessage) => {
  if (res.statusCode != 200) {
    process.exit(1);
  }

  process.exit(0);
});

req.on('error', () => {
  process.exit(1);
});

req.end();
