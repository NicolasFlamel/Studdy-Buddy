import pino from 'pino';
import { ENV } from './env';
import { pinoHttp } from 'pino-http';

const isDev = ENV.NODE_ENV !== 'production';

const logger = pino({
  level: ENV.LOG_LEVEL || 'info',
  ...(isDev && {
    transport: {
      targets: [
        {
          target: 'pino-pretty',
          options: { colorize: true, ignore: 'pid,hostname' },
          level: 'info',
        },
        {
          target: 'pino/file',
          options: { destination: './logs/app.log', mkdir: true },
          level: 'debug',
        },
      ],
    },
  }),
  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
});

const useExpressPino = pinoHttp({
  logger,
  autoLogging: !isDev,
  customLogLevel(_req, res, err) {
    if (err || res.statusCode >= 500) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  },
  redact: {
    paths: ['req.headers.authorization', 'req.headers.cookie'],
    censor: '[REDACTED]',
  },
});

export { logger, useExpressPino };
