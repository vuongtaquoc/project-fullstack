import * as winston from 'winston';
import { LOGGER_LEVEL } from '../common/env';

const logger = winston.createLogger({
  level: LOGGER_LEVEL,
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      level: LOGGER_LEVEL,
      format: winston.format.simple(),
    }),
  ],
});

export default logger;
