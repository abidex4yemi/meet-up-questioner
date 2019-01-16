import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../app';
import Helper from '../helper/Helper';

const {
  expect,
} = chai;

// using chai-http middleware
chai.use(chaiHttp);

const user = {
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  email: faker.internet.email(),
  phonenumber: '08162990467',
  password: '1940andela',
  passwordConf: '1940andela',
  username: faker.internet.userName(),
};


// Test suite for POST /signup route
describe('POST api/v1/auth/signup', () => {
  it('Should successfully create a user account if inputs are valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        if (err) done();
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(201);
        expect(body.data[0]).to.haveOwnProperty('token');
        expect(body.data[0]).to.haveOwnProperty('user');
        expect(body.data[0].user).to.be.an('object');
        expect(body.data[0].token).to.be.a('string');
        done();
      });
  });
});

// Test suite for POST /signup route invalid
describe('POST api/v1/auth/signup', () => {
  it('Should return an error if signup inputs are invalid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({})
      .end((err, res) => {
        if (err) done();
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equal(400);
        expect(body).to.haveOwnProperty('error');
        done();
      });
  });
});


describe('POST api/v1/auth/signup', () => {
  it('should return an error if email already exists', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: 'Montana_Considine33@gmail.com',
        phonenumber: '08162990467',
        password: '1940andela',
        passwordConf: '1940andela',
        username: faker.internet.userName(),
      })
      .end((err, res) => {
        if (err) done();
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('errors');
        expect(body.errors).to.be.a('string');
        expect(body.errors).to.equals('User already exist');
        done();
      });
  });
});

/**
 * login test suite
 */
describe('POST api/v1/auth/login', () => {
  it('Should successfully log a user in if login inputs are valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'Nikita.Hermiston@yahoo.com',
        password: '1940andela',
      })
      .end((err, res) => {
        if (err) done();
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body.data[0]).to.haveOwnProperty('token');
        expect(body.data[0]).to.haveOwnProperty('user');
        expect(body.data[0].user).to.be.an('object');
        expect(body.data[0].token).to.be.a('string');
        done();
      });
  });
});

describe('POST api/v1/auth/login', () => {
  it('Should return an error if login email is invalid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'Nikita.Hermiston@yaho.com',
        password: '1940andela',
      })
      .end((err, res) => {
        if (err) done();
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(404);
        expect(body).to.haveOwnProperty('errors');
        expect(body.errors).to.be.equal('User not Found');
        done();
      });
  });
});

describe('POST api/v1/auth/login', () => {
  it('Should return an error if login inputs are empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({})
      .end((err, res) => {
        if (err) done();
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(400);
        expect(body).to.haveOwnProperty('error');
        done();
      });
  });
});

describe('POST api/v1/auth/login', () => {
  it('Should return an error if login password is not correct', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'Nikita.Hermiston@yahoo.com',
        password: '1940andel',
      })
      .end((err, res) => {
        if (err) done();
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(404);
        expect(body).to.haveOwnProperty('errors');
        expect(body.errors).to.be.equal('Email/Password incorrect');
        done();
      });
  });
});

// Test suite for hashPassword(password)
describe('Helper.hashPassword(password)', () => {
  it('Should return hashed password (string)', () => {
    const result = Helper.hashPassword('19841984epic');
    expect(result).to.be.a('string');
  });
});

// Test suite for comparePassword if password matches hash
describe('Helper.comparePassword(password, hashedPassword)', () => {
  it('Should return true if password matches hashed', () => {
    const result = Helper.comparePassword('19841984epic', '$2b$08$LeFhTi4YeQshPvZ2IbcOr.951SX3O0Hf9zTpwFm.a/5G11MffqtUO');
    expect(result).to.be.equal(true);
  });
});

// Test suite for comparePassword if password does not matches hash
describe('Helper.comparePassword(password, hashedPassword)', () => {
  it('Should return false if password does not matches hashed', () => {
    const result = Helper.comparePassword('19841984ep', '$2b$08$LeFhTi4YeQshPvZ2IbcOr.951SX3O0Hf9zTpwFm.a/5G11MffqtUO');
    expect(result).to.be.equal(false);
  });
});
