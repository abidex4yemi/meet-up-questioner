import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../app';
import Helper from '../helper/Helper';

const { expect } = chai;

const user = {
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  email: faker.internet.email(),
  phonenumber: '08162990467',
  password: '1940andela',
  passwordConf: '1940andela',
  username: faker.internet.userName(),
};

let adminToken;
let defaultTokenUser;

// using chai-http middleware
chai.use(chaiHttp);

// GET Test for valid Home route (/)
describe('GET / (Home Route)', () => {
  it('Should return a welcome message', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equal(200);
        expect(body).to.haveOwnProperty('data');
        expect(body.data[0].message).to.be.equal('Welcome to Questioner Home Route');
        done();
      });
  });
});


// ========================USERS TEST=====================
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
        email: 'Kasey.Wilderman72@yahoo.com',
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
        email: 'Kasey.Wilderman72@yahoo.com',
        password: '1940andela',
      })
      .end((err, res) => {
        if (err) done();

        const {
          body,
        } = res;

        adminToken = body.data[0].token;

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

// default normal token user
describe('POST api/v1/auth/login', () => {
  it('Should successfully log a user in if login inputs are valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'Montana_Considine33@gmail.com',
        password: '1940andela',
      })
      .end((err, res) => {
        if (err) done();

        const {
          body,
        } = res;

        defaultTokenUser = body.data[0].token;

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
        email: 'Kasey.Wilderman72@yahoo.com',
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

/**
 * Unit Test for validity on /meetups route
 * /api/v1/meetups END-POINTS
 */

// Test for invalid request /meetups
describe('POST /api/v1/meetups', () => {
  it('should return an error if user input is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/meetups')
      .set('token', defaultTokenUser)
      .send({
        location: '',
        topic: '',
        happeningOn: '',
        tags: [],
      })
      .end((err, res) => {
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.error).to.be.an('array');
        expect(body.status).to.be.equal(400);
        expect(body).to.haveOwnProperty('error');
        done();
      });
  });
});


// Test for valid request /meetups
describe('POST /api/v1/meetups', () => {
  it('should create a meet up record if user input is valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/meetups/')
      .set('token', adminToken)
      .send({
        location: 'lagos',
        topic: 'What is ios development?',
        happeningOn: '12/27/2018 2:30 pm',
      })
      .end((err, res) => {
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equal(201);
        expect(body.data[0]).to.be.an('object');
        expect(body.message).to.be.a('string');
        expect(body).to.haveOwnProperty('message');
        expect(body).to.haveOwnProperty('data');
        expect(body.message).to.be.equals('New Meet Up Record Created Successfully');
        done();
      });
  });
});

// GET Test for valid request (all meetup records)
describe('GET /api/v1/meetups/ (Record Found)', () => {
  it('Should return all meetup records available', (done) => {
    chai
      .request(app)
      .get('/api/v1/meetups/')
      .set('token', defaultTokenUser)
      .end((err, res) => {
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equal(200);
        expect(body).to.haveOwnProperty('data');
        done();
      });
  });
});

// GET Test for valid request (specific meet up id)
describe('GET /api/v1/meetups/:meetup_id (valid meetup id)', () => {
  it('Should return a meet up record with specific id ', (done) => {
    chai
      .request(app)
      .get('/api/v1/meetups/1')
      .set('token', defaultTokenUser)
      .end((err, res) => {
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equal(200);
        expect(body.data[0]).to.be.an('object');
        expect(body).to.haveOwnProperty('data');
        done();
      });
  });
});

// GET Test for invalid request (specific meet up id)
describe('GET /api/v1/meetups/:meetup_id (invalid id)', () => {
  it('should return an error if a user attempts to make a request with invalid record id', (done) => {
    chai
      .request(app)
      .get(`/api/v1/meetups/:meetup_id/${faker.random.number() + 500}`)
      .set('token', defaultTokenUser)
      .end((err, res) => {
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.error).to.be.an('object');
        expect(body.status).to.be.equal(404);
        expect(body).to.haveOwnProperty('error');
        done();
      });
  });
});

// GET Test for valid request (all upcoming meetup records)
describe('GET /api/v1/meetups/upcoming/ (Record Found)', () => {
  it('Should return all upcoming meetup records available', (done) => {
    chai
      .request(app)
      .get('/api/v1/meetups/upcoming/')
      .set('token', defaultTokenUser)
      .end((err, res) => {
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equal(200);
        expect(body).to.haveOwnProperty('data');
        done();
      });
  });
});

/**
 * Unit Test for validity on /questions route
 * /api/v1/questions END-POINTS
 */

// Test for invalid request /questions
describe('POST /api/v1/questions', () => {
  it('Should return an error if user input is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/questions')
      .send({
        meetup: '',
        title: '',
        body: '',
      })
      .set('token', adminToken)
      .end((err, res) => {
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.error).to.be.an('array');
        expect(body.status).to.be.equal(400);
        expect(body).to.haveOwnProperty('error');
        done();
      });
  });
});

describe('POST /api/v1/questions', () => {
  it('Should return an error if meetup record not found', (done) => {
    chai.request(app)
      .post('/api/v1/questions')
      .send({
        meetup: 2000,
        title: 'What is jquery',
        body: 'I really love this course....',
      })
      .set('token', adminToken)
      .end((err, res) => {
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.errors).to.be.equal('Meetup id does not exist');
        expect(body.status).to.be.equal(400);
        expect(body).to.haveOwnProperty('errors');
        done();
      });
  });
});

// Test for valid request /questions
describe('POST /api/v1/questions', () => {
  it('Should create a question record if user input is valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/questions')
      .send({
        meetup: 1,
        title: 'What is java development?',
        body: 'I really love this topic...',
      })
      .set('token', adminToken)
      .end((err, res) => {
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equal(201);
        expect(body.data[0]).to.be.an('object');
        expect(body.message).to.be.a('string');
        expect(body).to.haveOwnProperty('message');
        expect(body).to.haveOwnProperty('data');
        expect(body.message).to.be.equals('New Meetup Question Record Created Successfully');
        done();
      });
  });
});

// PATCH Test for valid request/questions/:question_id/upvote
describe('PATCH /api/v1/questions/:question_id/upvote (Invalid)', () => {
  it('Should return error message with 404 if question record no found', (done) => {
    chai
      .request(app)
      .patch('/api/v1/questions/5000/upvote')
      .send({
        status: 404,
      })
      .set('token', defaultTokenUser)
      .end((err, res) => {
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equal(404);
        expect(body).to.haveOwnProperty('errors');
        expect(body.errors).to.be.equals('No Question Record Found with id: 5000');
        done();
      });
  });
});

// PATCH Test for valid request /questions/:question_id/upvote
describe('PATCH /api/v1/questions/:question_id/upvote (valid)', () => {
  it('Should increase a specific question votes count with 1 ', (done) => {
    chai
      .request(app)
      .patch('/api/v1/questions/1/upvote')
      .send({
        status: 200,
      })
      .set('token', defaultTokenUser)
      .end((err, res) => {
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equal(200);
        expect(body).to.haveOwnProperty('data');
        expect(body.data).to.be.an('array');
        expect(body.message).to.be.equals('Question upvoted successfully');
        done();
      });
  });
});

// PATCH Test for valid request/questions/:question_id/downvote
describe('PATCH /api/v1/questions/:question_id/downvote (Invalid)', () => {
  it('Should return error message with 404 if question record not found', (done) => {
    chai
      .request(app)
      .patch('/api/v1/questions/5000/downvote')
      .send({
        status: 404,
      })
      .set('token', defaultTokenUser)
      .end((err, res) => {
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equal(404);
        expect(body).to.haveOwnProperty('errors');
        expect(body.errors).to.be.equals('No Question Record Found with id: 5000');
        done();
      });
  });
});

// PATCH Test for valid request /questions/:question_id/downvote
describe('PATCH /api/v1/questions/:question_id/downvote (valid)', () => {
  it('Should decrease a specific question votes count with 1', (done) => {
    chai
      .request(app)
      .patch('/api/v1/questions/1/downvote')
      .send({
        status: 200,
      })
      .set('token', defaultTokenUser)
      .end((err, res) => {
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equal(200);
        expect(body).to.haveOwnProperty('data');
        expect(body.data).to.be.an('array');
        expect(body.message).to.be.equals('Question downvoted successfully');
        done();
      });
  });
});

// POST Test for valid request POST /api/v1/meetups/:meetups_id/rsvps
describe('POST /api/v1/meetups/:meetups_id/rsvps (Invalid)', () => {
  it('Should return error message with 404 if meetup rsvp record not found', (done) => {
    chai
      .request(app)
      .post('/api/v1/meetups/1000/rsvps')
      .set('token', defaultTokenUser)
      .send({ response: 'maybe' })
      .end((err, res) => {
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equal(404);
        expect(body).to.haveOwnProperty('errors');
        expect(body.errors).to.be.equal('Meetup record not found');
        done();
      });
  });
});

// POST Test for valid request POST /api/v1/meetups/:meetups_id/rsvps
describe('POST  /api/v1/meetups/:meetup_id/rsvps (valid)', () => {
  it('Should create new meet up rsvp record', (done) => {
    chai
      .request(app)
      .post('/api/v1/meetups/1/rsvps')
      .set('token', defaultTokenUser)
      .send({ response: 'yes' })
      .end((err, res) => {
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equal(201);
        expect(body).to.haveOwnProperty('data');
        expect(body.data).to.be.an('array');
        expect(body.message).to.be.equals('Meetup RSVP record created');
        done();
      });
  });
});

// POST Test for valid request POST /api/v1/meetups/:meetups_id/rsvps
describe('POST  /api/v1/meetups/:meetup_id/rsvps (inValid)', () => {
  it('Should return error if body is not specified', (done) => {
    chai
      .request(app)
      .post('/api/v1/meetups/10000/rsvps')
      .set('token', defaultTokenUser)
      .send({})
      .end((err, res) => {
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equal(400);
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.be.an('array');
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


/**
 * Custom function Test suits
 */
// Test suite for filterInteger(value)
describe('filterInteger()', () => {
  it('Should return false if argument is invalid', () => {
    const result = Helper.filterInt('001yemi');
    expect(result).to.be.equal(false);
  });
});

// Test suite for findAllRecords(Array)
describe('Helper.findAllRecords()', () => {
  it('Should return false if no record is found', () => {
    const result = Helper.findAllRecords([]);
    expect(result).to.be.equal(false);
  });
});

// Test suite for findSingleRecord(objArr, objId)
describe('Helper.findSingleRecord(objArr, objId)', () => {
  it('Should return false if no record is found', () => {
    const result = Helper.findSingleRecord([], -1);
    expect(result).to.be.equal(undefined);
  });
});

// Test suite for generateID(objArr, index)
describe('Helper.generateID(objArr, index)', () => {
  it('Should return 0 if objArr length is less than 0 or empty Array', () => {
    const result = Helper.generateID([], 0);
    expect(result).to.be.equal(0);
  });
});
