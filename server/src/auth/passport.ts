import * as passport from 'passport';
import * as ERRORS from 'restify-errors';

import * as auth from './auth';

import { User } from './../models/user';

class JwtStrategy extends passport.Strategy {
  authenticate(req: any): any {
    let token = req.headers.authorization;
    if (token === undefined) {
      this.error(new ERRORS.UnauthorizedError('Invalid access token'));
      return;
    }

    token = token.replace('Bearer ', '');
    auth.verify(token).then((user) => {
      this.success(user);
    }).catch(() => this.error(new ERRORS.UnauthorizedError('Invalid access token')));
  }
}

const strategy = new JwtStrategy();

passport.use('jwt', strategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
