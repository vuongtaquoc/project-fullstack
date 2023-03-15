import * as passport from 'passport';
import { asyncMiddleware } from './async-middleware';

// controllers
import * as authController from './controllers/auth-controller';
import * as movieController from './controllers/movie-controller';

export const route = (server) => {
  // auth
  server.post('/auth/login', asyncMiddleware(authController.login));
  server.post('/auth/register', asyncMiddleware(authController.register));
  server.get('/me', passport.authenticate('jwt', { session: false }), asyncMiddleware(authController.me));

  // movie
  server.post('/movies', passport.authenticate('jwt', { session: false }), asyncMiddleware(movieController.insert));
  server.get('/movies', asyncMiddleware(movieController.findAll));

  server.get('/', (req, res, next) => {
    res.send({
      hello: 'world'
    });
  });
};
