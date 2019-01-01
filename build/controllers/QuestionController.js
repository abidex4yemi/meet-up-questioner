"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _questionrecord = _interopRequireDefault(require("../data/questionrecord.json"));

var _filterInt = _interopRequireDefault(require("../helper/filterInt"));

var _findIndex = _interopRequireDefault(require("../helper/findIndex"));

var _generateID = _interopRequireDefault(require("../helper/generateID"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var QuestionController = {
  /**
   *
   * Create new question record
   *
   * @param object req
   * @param object res
   *
   * @returns object question object
   */
  create: function () {
    var _create = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var uniqueID, values;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              uniqueID = (0, _generateID.default)(_questionrecord.default.allQuestionRecord, 0); // get all post request body data

              values = {
                id: uniqueID,
                createdOn: new Date().toUTCString(),
                createdBy: req.value.body.createdBy,
                meetup: req.value.body.meetup,
                title: req.value.body.title,
                body: req.value.body.body,
                votes: 0
              };
              _context.prev = 2;

              // save record to data structure
              _questionrecord.default.allQuestionRecord.unshift(values); // read question json file


              _fs.default.writeFile('app/data/questionrecord.json', JSON.stringify(_questionrecord.default), 'utf8', function (error) {
                console.log("file not found: ".concat(error));
              });

              return _context.abrupt("return", res.status(200).json({
                status: 201,
                message: 'New Meetup Question Record Created Successfully',
                data: [{
                  user: values.createdBy,
                  meetup: values.meetup,
                  title: values.title,
                  body: values.body
                }]
              }));

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](2);
              return _context.abrupt("return", res.status(400).end({
                status: 400,
                errors: {
                  error: _context.t0
                }
              }));

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[2, 8]]);
    }));

    function create(_x, _x2) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),

  /**
   *
   * Upvote a specific question record
   *
   * @param object req
   * @param object res
   *
   * @returns object question object
   */
  upvote: function () {
    var _upvote = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var questionId, singleRecordIndex, upvotedQuestion, updateVotes;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              // Get and sanitize for valid integer
              questionId = (0, _filterInt.default)(req.params.question_id); // Get a single meet up record

              singleRecordIndex = (0, _findIndex.default)(_questionrecord.default.allQuestionRecord, questionId); // if no matching question record

              if (!(singleRecordIndex === -1)) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return", res.status(404).send({
                status: 404,
                message: 'No Question Record Found',
                error: 404
              }));

            case 5:
              // question being upvoted
              upvotedQuestion = _questionrecord.default.allQuestionRecord[singleRecordIndex]; // increase vote

              updateVotes = {
                id: upvotedQuestion.id,
                createdOn: upvotedQuestion.createdOn,
                createdBy: upvotedQuestion.createdBy,
                meetup: upvotedQuestion.meetup,
                title: upvotedQuestion.title,
                body: upvotedQuestion.body,
                votes: upvotedQuestion.votes + 1
              }; // Update question record

              _questionrecord.default.allQuestionRecord.splice(singleRecordIndex, 1, updateVotes); // read question json file


              _fs.default.writeFile('app/data/questionrecord.json', JSON.stringify(_questionrecord.default), 'utf8', function (error) {
                console.log("file not found: ".concat(error));
              });

              return _context2.abrupt("return", res.status(200).json({
                status: 200,
                message: 'Question upvoted successfully',
                data: [{
                  meetup: updateVotes.meetup,
                  title: updateVotes.title,
                  body: updateVotes.body
                }]
              }));

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", res.status(404).end({
                status: 404,
                errors: {
                  error: _context2.t0
                }
              }));

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[0, 12]]);
    }));

    function upvote(_x3, _x4) {
      return _upvote.apply(this, arguments);
    }

    return upvote;
  }(),

  /**
   *
   * Downvote a specific question record
   *
   * @param object req
   * @param object res
   *
   * @returns object question object
   */
  downvote: function () {
    var _downvote = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var questionId, singleRecordIndex, upvotedQuestion, updateVotes;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              // Get and sanitize for valid integer
              questionId = (0, _filterInt.default)(req.params.question_id); // Get a single meet up record

              singleRecordIndex = (0, _findIndex.default)(_questionrecord.default.allQuestionRecord, questionId); // if no matching question record

              if (!(singleRecordIndex === -1)) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt("return", res.status(404).send({
                status: 404,
                message: 'No Question Record Found',
                error: 404
              }));

            case 5:
              // question being upvoted
              upvotedQuestion = _questionrecord.default.allQuestionRecord[singleRecordIndex]; // increase vote

              updateVotes = {
                id: upvotedQuestion.id,
                createdOn: upvotedQuestion.createdOn,
                createdBy: upvotedQuestion.createdBy,
                meetup: upvotedQuestion.meetup,
                title: upvotedQuestion.title,
                body: upvotedQuestion.body,
                votes: upvotedQuestion.votes - 1
              }; // Update question record

              _questionrecord.default.allQuestionRecord.splice(singleRecordIndex, 1, updateVotes); // read question json file


              _fs.default.writeFile('app/data/questionrecord.json', JSON.stringify(_questionrecord.default), 'utf8', function (error) {
                console.log("file not found: ".concat(error));
              });

              return _context3.abrupt("return", res.status(200).json({
                status: 200,
                message: 'Question Downvoted successfully',
                data: [{
                  meetup: updateVotes.meetup,
                  title: updateVotes.title,
                  body: updateVotes.body
                }]
              }));

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", res.status(404).end({
                status: 404,
                errors: {
                  error: _context3.t0
                }
              }));

            case 15:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[0, 12]]);
    }));

    function downvote(_x5, _x6) {
      return _downvote.apply(this, arguments);
    }

    return downvote;
  }()
}; // expose QuestionController to be use in another file

var _default = QuestionController;
exports.default = _default;
//# sourceMappingURL=QuestionController.js.map