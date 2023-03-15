import * as RestifyErrors from 'restify-errors';
import { User } from './../models/user';
import { sign } from './../auth/auth';
import { formatResponse, getUserFromReq } from '../utils/api-helper';

// POST /auth/login
export async function login(req, res, next) {
  const query:any = {};
  if (req.body.username) {
    query.username = req.body.username;
  }

  const user = await User.findOne(query).exec();
  let authenticated = false;
  if (user !== null) {
    authenticated = await user.verifyPassword(req.body.password);
  }

  if (!authenticated) {
    throw new RestifyErrors.UnauthorizedError('password incorrect');
  } else {
    const token = await sign(user);
    res.send(formatResponse({ user, token }));
    return next();
  }
}

// POST /auth/register
export async function register(req, res, next) {
  const { username, password } = req.body;
  const passwordHash = await User.hashPassword(password);
  const user = new User({
    username,
    password_hash: passwordHash,
  });

  await user.save();

  const token = await sign(user);

  res.send(formatResponse({
    user,
    token,
  }));
  return next();
}

export async function me(req, res, next) {
  const user = await getUserFromReq(req);
  res.send(formatResponse({
    user,
  }));
  return next();
}
