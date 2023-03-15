import * as chai from 'chai';
import chaiHttp = require('chai-http');
import server from '../../src/server';
import {
  MONGODB_URL,
} from '../../src/common/env';
import * as PromiseBluebird from 'bluebird';
import * as mongoose from 'mongoose';

chai.use(chaiHttp);

const { expect } = chai;

describe('api', () => {
  // before the tests setup the mongo constant first
  before(() => {
    const mongoDB = MONGODB_URL;
    const opt = {
      useNewUrlParser: true,
      user: null,
      pass: null,
      auth: null,
    };

    mongoose.connect(mongoDB, opt);
  });

  describe('auth', () => {
    after((done) => {
      mongoose.connection.db.dropCollection('users').then(done);
    });

    it('it should return 401 if not logged in', async () => {
      const res = await chai.request(server).get('/me');
      expect(res.status).to.be.eq(401);
    });

    it('it should register a user', async () => {
      const res = await chai.request(server).post('/auth/register').type('json').send({
        username: 'abc',
        password: 'abc',
        mobile: '99999999',
      });
      expect(res.status).to.be.eq(200);
      expect(res.body.success).to.be.true;
      expect(res.body.access_token).to.be.not.null;
    });

    it('it should return error for duplicated keys', async() => {
      let res = await chai.request(server).post('/auth/register').type('json').send({
        username: 'abc',
        password: 'abc',
        mobile: '99999999',
      });
      expect(res.status).to.be.eq(200);

      res = await chai.request(server).post('/auth/register').type('json').send({
        username: 'abc',
        password: 'abc',
        mobile: '99999999',
      });
      expect(res.status).to.be.eq(500);

    });
  });
});
