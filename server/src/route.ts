import * as passport from 'passport';
import { asyncMiddleware } from './async-middleware';

// controllers
import * as authController from './controllers/auth-controller';

export const route = (server) => {
  // auth
  server.post('/auth/local', asyncMiddleware(authController.login));
  server.post('/auth/register', asyncMiddleware(authController.register));
  server.get('/me', passport.authenticate('jwt'), asyncMiddleware(authController.me));

  server.get('/', (req, res, next) => {
    res.send({
      hello: 'world'
    });
  });
};
