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

// Invalid route Test for invalid
describe('GET / Invalid route', () => {
  it('Should return a welcome message', (done) => {
    chai
      .request(app)
      .get('/api/v1/invalid')
      .end((err, res) => {
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equal(404);
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.be.equal('Wrong request. Route does not exist');
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
        const {
          body,
        } = res;

        defaultTokenUser = body.data[0].token;
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
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(409);
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.be.a('string');
        expect(body.error).to.equals('User already exist');
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
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(404);
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.be.equal('User not Found');
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
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(401);
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.be.equal('Email/Password incorrect');
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
  it('Should create a meet up record if user input is valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/meetups/')
      .set('token', adminToken)
      .send({
        location: 'Kano',
        topic: 'Why remote job is the future?',
        happeningOn: '3/3/2019 2:30 PM',
        tags: [faker.random.word()],
        images: [faker.image.nature()],
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


// Test for invalid request /meetups/<:meetup-id>/images
describe('POST /api/v1/meetups/<:meetup-id>/images', () => {
  it('Should return an error if user input is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/meetups/30000/images')
      .set('token', adminToken)
      .send({
        images: [],
      })
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


// Test for unauthorized, if user is not admin /meetups/<:meetup-id>/images
describe('POST /api/v1/meetups/<:meetup-id>/images', () => {
  it('Should return an error if user is not admin invalid', (done) => {
    chai.request(app)
      .post('/api/v1/meetups/3000/images')
      .set('token', defaultTokenUser)
      .send({
        images: [faker.image.nature()],
      })
      .end((err, res) => {
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.error).to.be.a('string');
        expect(body.status).to.be.equal(403);
        expect(body).to.haveOwnProperty('error');
        done();
      });
  });
});

// Test for non-existent record, /meetups/<:meetup-id>/images
describe('POST /api/v1/meetups/<:meetup-id>/images', () => {
  it('Should return an error if meetup record does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/meetups/30000/images')
      .set('token', adminToken)
      .send({
        images: [faker.image.business()],
      })
      .end((err, res) => {
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.error).to.be.a('string');
        expect(body.status).to.be.equal(404);
        expect(body).to.haveOwnProperty('error');
        done();
      });
  });
});


// Test for valid request /meetups
describe('POST /api/v1/meetups/<meetup-id/images', () => {
  it('Should update a specific meetup record image if user input is valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/meetups/1/images')
      .set('token', adminToken)
      .send({
        images: [faker.image.business()],
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
        expect(body.message).to.be.equals('Meetup image updated Successfully');
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
      .get(`/api/v1/meetups/${faker.random.number() + 10000}`)
      .set('token', defaultTokenUser)
      .end((err, res) => {
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
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

// GET Test for valid request (all meetup records)
describe('DELETE /api/v1/meetups/ (Delete record)', () => {
  it('Should delete a specific meetup record with user provided id', (done) => {
    chai
      .request(app)
      .get('/api/v1/meetups/4')
      .set('token', adminToken)
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

// GET Test for valid request (all meetup records)
describe('DELETE /api/v1/meetups/10000 (Could not delete invalid id)', () => {
  it('Should return an error if meetup id not found', (done) => {
    chai
      .request(app)
      .get('/api/v1/meetups/10000')
      .set('token', adminToken)
      .end((err, res) => {
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equal(404);
        expect(body).to.haveOwnProperty('error');
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
        expect(body.error).to.be.equal('Meetup Record Not Found');
        expect(body.status).to.be.equal(404);
        expect(body).to.haveOwnProperty('error');
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

describe('GET /api/v1/questions', () => {
  it('Should return all users question record', (done) => {
    chai.request(app)
      .get('/api/v1/questions')
      .end((err, res) => {
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equal(200);
        expect(body).to.haveOwnProperty('data');
        expect(body).to.haveOwnProperty('message');
        done();
      });
  });
});

describe('GET /api/v1/questions/user', () => {
  it('Should return total number of question posted by a user', (done) => {
    chai.request(app)
      .get('/api/v1/questions/user')
      .set('token', adminToken)
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

describe('POST /api/v1/comments', () => {
  it('Should return an error if question record not found', (done) => {
    chai.request(app)
      .post('/api/v1/comments')
      .send({
        commentBody: 'This is a fantastic meetup topic i will be attending...',
        questionId: 2000,
      })
      .set('token', defaultTokenUser)
      .end((err, res) => {
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.error).to.be.equal('Question id does not exist');
        expect(body.status).to.be.equal(404);
        expect(body).to.haveOwnProperty('error');
        done();
      });
  });
});

describe('POST /api/v1/comments', () => {
  it('Should return comment on a specific question(valid)', (done) => {
    chai.request(app)
      .post('/api/v1/comments')
      .send({
        commentBody: 'This is a good meetup topic i will be attending...',
        questionId: 6,
      })
      .set('token', defaultTokenUser)
      .end((err, res) => {
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.message).to.be.equal('Successfully commented on question');
        expect(body.status).to.be.equal(201);
        expect(body).to.haveOwnProperty('data');
        done();
      });
  });
});

describe('GET /api/v1/comments', () => {
  it('Should return all users comments on question record', (done) => {
    chai.request(app)
      .get('/api/v1/comments')
      .end((err, res) => {
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.message).to.be.equal('These are users comments');
        expect(body.status).to.be.equal(200);
        expect(body).to.haveOwnProperty('data');
        done();
      });
  });
});


describe('GET /api/v1/comments/user', () => {
  it('Should return total number of commented question by a user', (done) => {
    chai.request(app)
      .get('/api/v1/comments/user')
      .set('token', adminToken)
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
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.be.equals('No Question Record Found with id: 5000');
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
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.be.equals('No Question Record Found with id: 5000');
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
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.be.equal('Meetup record not found');
        done();
      });
  });
});

// POST Test for valid request POST /api/v1/meetups/:meetups_id/rsvps
describe('POST  /api/v1/meetups/:meetup_id/rsvps (valid)', () => {
  it('Should create new meet up rsvp record', (done) => {
    chai
      .request(app)
      .post('/api/v1/meetups/200/rsvps')
      .set('token', defaultTokenUser)
      .send({ response: 'No' })
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


// GET Test for valid request GET /api/v1/meetups/rsvps
describe('GET /api/v1/meetups/rsvps (Invalid)', () => {
  it('Should return error if user is not logged in', (done) => {
    chai
      .request(app)
      .get('/api/v1/meetups/rsvps')
      .set('token', '')
      .end((err, res) => {
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equal(403);
        expect(body).to.haveOwnProperty('error');
        expect(body.error).to.be.equal('Unauthorized!, you have to login');
        done();
      });
  });
});

// GET Test for valid request GET /api/v1/meetups/rsvps
describe('GET  /api/v1/meetups/rsvps (valid)', () => {
  it('Should return user scheduled upcoming meetups', (done) => {
    chai
      .request(app)
      .get('/api/v1/meetups/rsvps')
      .set('token', adminToken)
      .end((err, res) => {
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equal(200);
        expect(body).to.haveOwnProperty('data');
        expect(body.data).to.be.an('array');
        done();
      });
  });
});

// POST Test for valid request POST /api/v1/meetups/:meetups_id/rsvps
describe('GET /api/v1/meetups/rsvps (no record found)', () => {
  it('Should return Not found message no users scheduled upcoming record found', (done) => {
    chai
      .request(app)
      .get('/api/v1/meetups/rsvps')
      .set('token', defaultTokenUser)
      .end((err, res) => {
        const {
          body,
        } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equal(404);
        expect(body).to.haveOwnProperty('error');
        done();
      });
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
