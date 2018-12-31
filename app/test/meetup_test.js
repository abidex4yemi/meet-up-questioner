import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../app';

const { expect } = chai;

// using chai-http middleware
chai.use(chaiHttp);

/**
 * Unit Test for validity on /meetups route
 * /api/v1/meetups END-POINTS
 */

// Test for invalid request /meetups
describe('POST /api/v1/meetups', () => {
  it('should return an error if user input is invalid', (done) => {
    chai.request(app).post('/api/v1/meetups').send({
      location: '',
      topic: '',
      happeningOn: '',
      tags: [],
    }).end((err, res) => {
      const { body } = res;
      console.log(body);
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
      .send({
        location: 'lagos',
        topic: 'What is ios development?',
        happeningOn: '12/27/2018 2:30 pm',
        tags: ['native app', 'ios dev'],
      })
      .end((err, res) => {
        const {
          body,
        } = res;
        console.log(res.body);
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
      .end((err, res) => {
        const {
          body,
        } = res;
        console.log(res.body);
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
      .get('/api/v1/meetups/10')
      .end((err, res) => {
        const {
          body,
        } = res;
        console.log(res.body);
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
      .end((err, res) => {
        const {
          body,
        } = res;
        console.log(res.body);
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
      .end((err, res) => {
        const {
          body,
        } = res;
        console.log(res.body);
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
    chai.request(app).post('/api/v1/questions').send({
      createdBy: '',
      meetup: '',
      title: '',
      body: '',
    }).end((err, res) => {
      const {
        body,
      } = res;
      console.log(body);
      expect(body).to.be.an('object');
      expect(body.status).to.be.a('number');
      expect(body.error).to.be.an('array');
      expect(body.status).to.be.equal(400);
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
        createdBy: 3,
        meetup: 2,
        title: 'What is java development?',
        body: 'I really love this topic...',
      })
      .end((err, res) => {
        const {
          body,
        } = res;
        console.log(res.body);
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
      .patch('/api/v1/questions/500/upvote')
      .send({
        status: 404,
      })
      .end((err, res) => {
        const {
          body,
        } = res;
        console.log(res.body);
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equal(404);
        expect(body).to.haveOwnProperty('error');
        expect(body.message).to.be.equals('No Question Record Found');
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
      .end((err, res) => {
        const {
          body,
        } = res;
        console.log(res.body);
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
      .patch('/api/v1/questions/500/downvote')
      .send({
        status: 404,
      })
      .end((err, res) => {
        const {
          body,
        } = res;
        console.log(res.body);
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equal(404);
        expect(body).to.haveOwnProperty('error');
        expect(body.message).to.be.equals('No Question Record Found');
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
      .end((err, res) => {
        const {
          body,
        } = res;
        console.log(res.body);
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equal(200);
        expect(body).to.haveOwnProperty('data');
        expect(body.data).to.be.an('array');
        expect(body.message).to.be.equals('Question Downvoted successfully');
        done();
      });
  });
});

// POST Test for valid request POST /api/v1/meetups/:meetups_id/rsvps
describe('POST /api/v1/meetups/:meetups_id/rsvps (Invalid)', () => {
  it('Should return error message with 404 if meetup rsvp record not found', (done) => {
    chai
      .request(app)
      .post('/api/v1/meetups/500/rsvps')
      .send({
        status: 404,
      })
      .end((err, res) => {
        const {
          body,
        } = res;
        console.log(res.body);
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equal(404);
        expect(body).to.haveOwnProperty('error');
        expect(body.message).to.be.equals('No Meetup RSVP Record Found');
        done();
      });
  });
});

// POST Test for valid request POST /api/v1/meetups/:meetups_id/rsvps
describe('POST  /api/v1/meetups/:meetup_id/rsvps (valid)', () => {
  it('Should create new meet up rsvp record', (done) => {
    chai
      .request(app)
      .post('/api/v1/meetups/8/rsvps')
      .send({
        status: 201,
      })
      .end((err, res) => {
        const {
          body,
        } = res;
        console.log(res.body);
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
