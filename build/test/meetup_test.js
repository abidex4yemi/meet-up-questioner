"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _faker = _interopRequireDefault(require("faker"));

var _app = _interopRequireDefault(require("../app"));

var _filterInt = _interopRequireDefault(require("../helper/filterInt"));

var _findAllRecords = _interopRequireDefault(require("../helper/findAllRecords"));

var _generateID = _interopRequireDefault(require("../helper/generateID"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai.default.expect; // using chai-http middleware

_chai.default.use(_chaiHttp.default); // GET Test for valid Home route (/)


describe('GET / (Home Route)', function () {
  it('Should return a welcome message', function (done) {
    _chai.default.request(_app.default).get('/').end(function (err, res) {
      var body = res.body;
      console.log(res.body);
      expect(body).to.be.an('object');
      expect(body.status).to.be.a('number');
      expect(body.status).to.be.equal(200);
      expect(body).to.haveOwnProperty('data');
      expect(body.data[0].message).to.be.equal('Welcome to Questioner Home Route');
      done();
    });
  });
});
/**
 * Unit Test for validity on /meetups route
 * /api/v1/meetups END-POINTS
 */
// Test for invalid request /meetups

describe('POST /api/v1/meetups', function () {
  it('should return an error if user input is invalid', function (done) {
    _chai.default.request(_app.default).post('/api/v1/meetups').send({
      location: '',
      topic: '',
      happeningOn: '',
      tags: []
    }).end(function (err, res) {
      var body = res.body;
      console.log(body);
      expect(body).to.be.an('object');
      expect(body.status).to.be.a('number');
      expect(body.error).to.be.an('array');
      expect(body.status).to.be.equal(400);
      expect(body).to.haveOwnProperty('error');
      done();
    });
  });
}); // Test for valid request /meetups

describe('POST /api/v1/meetups', function () {
  it('should create a meet up record if user input is valid', function (done) {
    _chai.default.request(_app.default).post('/api/v1/meetups/').send({
      location: 'lagos',
      topic: 'What is ios development?',
      happeningOn: '12/27/2018 2:30 pm',
      tags: ['native app', 'ios dev']
    }).end(function (err, res) {
      var body = res.body;
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
}); // GET Test for valid request (all meetup records)

describe('GET /api/v1/meetups/ (Record Found)', function () {
  it('Should return all meetup records available', function (done) {
    _chai.default.request(_app.default).get('/api/v1/meetups/').end(function (err, res) {
      var body = res.body;
      console.log(res.body);
      expect(body).to.be.an('object');
      expect(body.status).to.be.a('number');
      expect(body.status).to.be.equal(200);
      expect(body).to.haveOwnProperty('data');
      done();
    });
  });
}); // GET Test for valid request (specific meet up id)

describe('GET /api/v1/meetups/:meetup_id (valid meetup id)', function () {
  it('Should return a meet up record with specific id ', function (done) {
    _chai.default.request(_app.default).get('/api/v1/meetups/10').end(function (err, res) {
      var body = res.body;
      console.log(res.body);
      expect(body).to.be.an('object');
      expect(body.status).to.be.a('number');
      expect(body.status).to.be.equal(200);
      expect(body.data[0]).to.be.an('object');
      expect(body).to.haveOwnProperty('data');
      done();
    });
  });
}); // GET Test for invalid request (specific meet up id)

describe('GET /api/v1/meetups/:meetup_id (invalid id)', function () {
  it('should return an error if a user attempts to make a request with invalid record id', function (done) {
    _chai.default.request(_app.default).get("/api/v1/meetups/:meetup_id/".concat(_faker.default.random.number() + 500)).end(function (err, res) {
      var body = res.body;
      console.log(res.body);
      expect(body).to.be.an('object');
      expect(body.status).to.be.a('number');
      expect(body.error).to.be.an('object');
      expect(body.status).to.be.equal(404);
      expect(body).to.haveOwnProperty('error');
      done();
    });
  });
}); // GET Test for valid request (all upcoming meetup records)

describe('GET /api/v1/meetups/upcoming/ (Record Found)', function () {
  it('Should return all upcoming meetup records available', function (done) {
    _chai.default.request(_app.default).get('/api/v1/meetups/upcoming/').end(function (err, res) {
      var body = res.body;
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

describe('POST /api/v1/questions', function () {
  it('Should return an error if user input is invalid', function (done) {
    _chai.default.request(_app.default).post('/api/v1/questions').send({
      createdBy: '',
      meetup: '',
      title: '',
      body: ''
    }).end(function (err, res) {
      var body = res.body;
      console.log(body);
      expect(body).to.be.an('object');
      expect(body.status).to.be.a('number');
      expect(body.error).to.be.an('array');
      expect(body.status).to.be.equal(400);
      expect(body).to.haveOwnProperty('error');
      done();
    });
  });
}); // Test for valid request /questions

describe('POST /api/v1/questions', function () {
  it('Should create a question record if user input is valid', function (done) {
    _chai.default.request(_app.default).post('/api/v1/questions').send({
      createdBy: 3,
      meetup: 2,
      title: 'What is java development?',
      body: 'I really love this topic...'
    }).end(function (err, res) {
      var body = res.body;
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
}); // PATCH Test for valid request/questions/:question_id/upvote

describe('PATCH /api/v1/questions/:question_id/upvote (Invalid)', function () {
  it('Should return error message with 404 if question record no found', function (done) {
    _chai.default.request(_app.default).patch('/api/v1/questions/500/upvote').send({
      status: 404
    }).end(function (err, res) {
      var body = res.body;
      console.log(res.body);
      expect(body).to.be.an('object');
      expect(body.status).to.be.a('number');
      expect(body.status).to.be.equal(404);
      expect(body).to.haveOwnProperty('error');
      expect(body.message).to.be.equals('No Question Record Found');
      done();
    });
  });
}); // PATCH Test for valid request /questions/:question_id/upvote

describe('PATCH /api/v1/questions/:question_id/upvote (valid)', function () {
  it('Should increase a specific question votes count with 1 ', function (done) {
    _chai.default.request(_app.default).patch('/api/v1/questions/1/upvote').send({
      status: 200
    }).end(function (err, res) {
      var body = res.body;
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
}); // PATCH Test for valid request/questions/:question_id/downvote

describe('PATCH /api/v1/questions/:question_id/downvote (Invalid)', function () {
  it('Should return error message with 404 if question record not found', function (done) {
    _chai.default.request(_app.default).patch('/api/v1/questions/500/downvote').send({
      status: 404
    }).end(function (err, res) {
      var body = res.body;
      console.log(res.body);
      expect(body).to.be.an('object');
      expect(body.status).to.be.a('number');
      expect(body.status).to.be.equal(404);
      expect(body).to.haveOwnProperty('error');
      expect(body.message).to.be.equals('No Question Record Found');
      done();
    });
  });
}); // PATCH Test for valid request /questions/:question_id/downvote

describe('PATCH /api/v1/questions/:question_id/downvote (valid)', function () {
  it('Should decrease a specific question votes count with 1', function (done) {
    _chai.default.request(_app.default).patch('/api/v1/questions/1/downvote').send({
      status: 200
    }).end(function (err, res) {
      var body = res.body;
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
}); // POST Test for valid request POST /api/v1/meetups/:meetups_id/rsvps

describe('POST /api/v1/meetups/:meetups_id/rsvps (Invalid)', function () {
  it('Should return error message with 404 if meetup rsvp record not found', function (done) {
    _chai.default.request(_app.default).post('/api/v1/meetups/500/rsvps').send({
      status: 404
    }).end(function (err, res) {
      var body = res.body;
      console.log(res.body);
      expect(body).to.be.an('object');
      expect(body.status).to.be.a('number');
      expect(body.status).to.be.equal(404);
      expect(body).to.haveOwnProperty('error');
      expect(body.message).to.be.equals('No Meetup RSVP Record Found');
      done();
    });
  });
}); // POST Test for valid request POST /api/v1/meetups/:meetups_id/rsvps

describe('POST  /api/v1/meetups/:meetup_id/rsvps (valid)', function () {
  it('Should create new meet up rsvp record', function (done) {
    _chai.default.request(_app.default).post('/api/v1/meetups/8/rsvps').send({
      status: 201
    }).end(function (err, res) {
      var body = res.body;
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
/**
 * Custom function Test suits
 */
// Test suite for filterInteger(value)

describe('filterInteger()', function () {
  it('Should return false if argument is invalid', function () {
    var result = (0, _filterInt.default)('001yemi');
    expect(result).to.be.equal(false);
  });
}); // Test suite for findAllRecords(Array)

describe('findAllRecords()', function () {
  it('Should return false if no record is found', function () {
    var result = (0, _findAllRecords.default)([]);
    expect(result).to.be.equal(false);
  });
}); // Test suite for generateID(objArr, index)

describe('generateID(objArr, index)', function () {
  it('Should return 0 if objArr length is less than 0 or empty Array', function () {
    var result = (0, _generateID.default)([], 0);
    expect(result).to.be.equal(0);
  });
});
//# sourceMappingURL=meetup_test.js.map