import * as restify from 'restify';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as passport from 'passport';
import * as corsMiddleware from 'restify-cors-middleware';

import { ERROR_SERVER_EXCEPTION } from './utils/api-error';

// Get the env variables
dotenv.config();

import logger from './utils/logger';
import { route } from './route';
import {
  MONGODB_URL, LOGGER_LEVEL,
} from './common/env';

// use the passport
import './auth/passport';

// Set up default mongoose connection
const mongoDB = MONGODB_URL;
const opt = {
  useNewUrlParser: true,
  user: null,
  pass: null,
  auth: null,
};

mongoose.connect(mongoDB, opt);

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0',
});

const cors = corsMiddleware({
  origins: ['*'],
  allowHeaders: ['Authorization'],
  exposeHeaders: ['Authorization']
});
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(passport.initialize());
server.pre(cors.preflight);
server.use(cors.actual);

//
if (LOGGER_LEVEL === 'debug') {
  server.use((req, res, next) => {
    logger.debug(req);
    next();
  });
}

route(server);

// Catch the errors and format the response
server.on('restifyError', (req, res, err, callback) => {
  logger.debug(err.message);
  logger.debug(err.stack);
  err.toJSON = function customToJSON() {
    return {
      success: false,
      error_code: err.code || ERROR_SERVER_EXCEPTION,
      error_message: err.message,
    };
  };
  err.toString = function customToString() {
    return {
      success: false,
      error_code: err.code || ERROR_SERVER_EXCEPTION,
      error_message: 'Internal Server Error',
    };
  };
  return callback();
});

server.listen(process.env.PORT || 5000, () => {
  logger.info(`${server.name} listening at ${server.url}`);
});

export default server;
