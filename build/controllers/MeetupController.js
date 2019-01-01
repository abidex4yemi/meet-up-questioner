"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _meetuprecord = _interopRequireDefault(require("../data/meetuprecord"));

var _filterInt = _interopRequireDefault(require("../helper/filterInt"));

var _findSingleRecord = _interopRequireDefault(require("../helper/findSingleRecord"));

var _findAllRecords = _interopRequireDefault(require("../helper/findAllRecords"));

var _generateID = _interopRequireDefault(require("../helper/generateID"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var MeetupController = {
  /**
   *
   * Create new meet up record
   *
   * @param object req
   * @param object res
   *
   * @returns object meetup object
   */
  create: function () {
    var _create = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var images, uniqueID, values;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // Set default value for optional fields if not set
              images = req.value.body.images || '';
              uniqueID = (0, _generateID.default)(_meetuprecord.default.allMeetupRecord, 0); // get all post request body data

              values = {
                id: uniqueID,
                createdOn: new Date().toUTCString(),
                location: req.value.body.location,
                images: [images],
                topic: req.value.body.topic,
                happeningOn: req.value.body.happeningOn,
                tags: req.value.body.tags
              };
              _context.prev = 3;

              // save record to data structure
              _meetuprecord.default.allMeetupRecord.unshift(values); // read meetup json file


              _fs.default.writeFile('app/data/meetuprecord.json', JSON.stringify(_meetuprecord.default), 'utf8', function (error) {
                console.log("file not found: ".concat(error));
              });

              return _context.abrupt("return", res.status(201).json({
                status: 201,
                message: 'New Meet Up Record Created Successfully',
                data: [{
                  topic: values.topic,
                  location: values.location,
                  happeningOn: values.happeningOn,
                  tags: values.tags
                }]
              }));

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](3);
              return _context.abrupt("return", res.status(400).send(_context.t0));

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 9]]);
    }));

    function create(_x, _x2) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),

  /**
    *
    * Accept or decline scheduled meetup
    *
    * @param object req
    * @param object res
    *
    * @returns object meetupRsvp object
    */
  meetupResponse: function () {
    var _meetupResponse = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var meetupId, singleRecord, meetupRsvp;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              // Get and sanitize for valid integer
              meetupId = (0, _filterInt.default)(req.params.meetup_id); // Get a single meet up record

              singleRecord = (0, _findSingleRecord.default)(_meetuprecord.default.allMeetupRecord, meetupId); // if no matching question record

              if (!(typeof singleRecord === 'undefined')) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return", res.status(404).send({
                status: 404,
                message: 'No Meetup RSVP Record Found',
                error: 404
              }));

            case 5:
              // get all matching data
              meetupRsvp = {
                id: singleRecord.id,
                topic: singleRecord.topic,
                status: ['maybe']
              }; // save record to data structure

              _meetuprecord.default.allMeetupRsvp.unshift(meetupRsvp); // read meetup json file


              _fs.default.writeFile('app/data/meetuprecord.json', JSON.stringify(_meetuprecord.default), 'utf8', function (error) {
                console.log("file not found: ".concat(error));
              });

              return _context2.abrupt("return", res.status(201).json({
                message: 'Meetup RSVP record created',
                status: 201,
                data: [meetupRsvp]
              }));

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", res.status(404).send(_context2.t0));

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[0, 11]]);
    }));

    function meetupResponse(_x3, _x4) {
      return _meetupResponse.apply(this, arguments);
    }

    return meetupResponse;
  }(),

  /**
   *
   * Get specific meet up record
   *
   * @param object req
   * @param object res
   *
   * @returns object meetup object
   */
  getSingleMeetup: function () {
    var _getSingleMeetup = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var meetupId, singleRecord;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              // Get valid integer
              meetupId = (0, _filterInt.default)(req.params.meetup_id); // Get a single meet up record

              singleRecord = (0, _findSingleRecord.default)(_meetuprecord.default.allMeetupRecord, meetupId); // On success

              return _context3.abrupt("return", res.status(200).json({
                status: 200,
                data: [{
                  topic: singleRecord.topic,
                  location: singleRecord.location,
                  happeningOn: singleRecord.happeningOn,
                  tags: singleRecord.tags
                }]
              }));

            case 6:
              _context3.prev = 6;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", res.status(404).send({
                status: 404,
                errors: {
                  message: 'Ooops error just occurred! meet up record not found',
                  error: _context3.t0
                }
              }));

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[0, 6]]);
    }));

    function getSingleMeetup(_x5, _x6) {
      return _getSingleMeetup.apply(this, arguments);
    }

    return getSingleMeetup;
  }(),

  /**
   *
   * Get all all meet up record
   *
   * @param object req
   * @param object res
   *
   * @returns object meetup object
   */
  getAllMeetups: function () {
    var _getAllMeetups = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var result, totalRows;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              result = (0, _findAllRecords.default)(_meetuprecord.default.allMeetupRecord);
              totalRows = result.length;

              if (result) {
                _context4.next = 5;
                break;
              }

              return _context4.abrupt("return", res.status(404).send({
                message: 'No Record Found',
                error: 404
              }));

            case 5:
              return _context4.abrupt("return", res.status(200).json({
                status: 200,
                message: "".concat(totalRows, " Meet Up Records Found"),
                data: result
              }));

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", res.status(400).send(_context4.t0));

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this, [[0, 8]]);
    }));

    function getAllMeetups(_x7, _x8) {
      return _getAllMeetups.apply(this, arguments);
    }

    return getAllMeetups;
  }(),

  /**
   *
   * Get all upcoming meetup records
   *
   * @param object req
   * @param object res
   *
   * @returns object meetup object
   */
  getAllUpComing: function () {
    var _getAllUpComing = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(req, res) {
      var result, totalRows;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              result = (0, _findAllRecords.default)(_meetuprecord.default.upcoming);
              totalRows = result.length;

              if (result) {
                _context5.next = 5;
                break;
              }

              return _context5.abrupt("return", res.status(404).send({
                message: 'No Record Found',
                error: 404
              }));

            case 5:
              return _context5.abrupt("return", res.status(200).json({
                status: 200,
                message: "".concat(totalRows, " Upcoming Meet Up Records Found"),
                data: result
              }));

            case 8:
              _context5.prev = 8;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", res.status(400).send(_context5.t0));

            case 11:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this, [[0, 8]]);
    }));

    function getAllUpComing(_x9, _x10) {
      return _getAllUpComing.apply(this, arguments);
    }

    return getAllUpComing;
  }()
}; // expose MeetupController to be use in another file

var _default = MeetupController;
exports.default = _default;
//# sourceMappingURL=MeetupController.js.map