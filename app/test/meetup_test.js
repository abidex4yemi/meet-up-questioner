import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;

// using chai-http middleware
chai.use(chaiHttp);

// create meet up test
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

// create question test
describe('POST /api/v1/questions', () => {
  it('should return an error if user input is invalid', (done) => {
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

describe('POST /api/v1/questions', () => {
  it('should create a question record if user input is valid', (done) => {
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
