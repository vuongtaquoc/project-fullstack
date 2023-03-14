import { EntityAlreadyExistsError, InternalError } from './utils/api-error';
import logger from './utils/logger';

export const asyncMiddleware = fn => (req, res, next) => {
  // Catch all the error
  Promise.resolve(fn(req, res, next))
    .catch((err) => {
      logger.error(err.stack);
      if (err.code === 11000) {
        return next(EntityAlreadyExistsError());
      }
      return next(InternalError(err));
    });
};
