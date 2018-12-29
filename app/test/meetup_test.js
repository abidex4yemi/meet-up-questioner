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

// Test for invalid request
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

// Test for valid request
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
        expect(body.status).to.be.equal(200);
        expect(body.data[0]).to.be.an('object');
        expect(body.message).to.be.a('string');
        expect(body).to.haveOwnProperty('message');
        expect(body).to.haveOwnProperty('data');
        expect(body.message).to.be.equals('New Meet Up Record Created Successfully');
        done();
      });
  });
});

// GET Test for valid request (specific meet up id)
describe('GET /api/v1/meetups/:meetup_id (valid meetup id)', () => {
  it('Should return a meet up record with specific id ', (done) => {
    chai
      .request(app)
      .get('/api/v1/meetups/0')
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
      .get(`/api/v1/meetups/:meetup_id/${faker.random.number() + 50}`)
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

// GET Test for valid request (all meetups records)
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

/**
 * Unit Test for validity on /questions route
 * /api/v1/questions END-POINTS
 */

// Test for invalid request
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

// Test for valid request
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
        expect(body.status).to.be.equal(200);
        expect(body.data[0]).to.be.an('object');
        expect(body.message).to.be.a('string');
        expect(body).to.haveOwnProperty('message');
        expect(body).to.haveOwnProperty('data');
        expect(body.message).to.be.equals('New Meet Question Record Created Successfully');
        done();
      });
  });
});
