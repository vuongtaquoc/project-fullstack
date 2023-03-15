import { BadRequestError } from './utils/api-error';
import * as Joi from 'joi';
import logger from './utils/logger';

export function validate(key) {
  return (req, res, next) => {

    const validator = validators[key];
    if (validator) {
      const { error } = validator.validate(req.body);
      if (error) {
        return next(BadRequestError(error.message));
      }
    }
    next();
  };
}

const validators = {
  '/auth/register': Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }).required(),
};
