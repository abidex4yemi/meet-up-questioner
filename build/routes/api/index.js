"use strict";

var _express = _interopRequireDefault(require("express"));

var _validate = _interopRequireDefault(require("../../validations/validate"));

var _validationSchema = _interopRequireDefault(require("../../validationSchemas/validationSchema"));

var _MeetupController = _interopRequireDefault(require("../../controllers/MeetupController"));

var _QuestionController = _interopRequireDefault(require("../../controllers/QuestionController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import external modules
var router = _express.default.Router(); // POST meet up route /meetups


router.post('/meetups', _validate.default.validateBody(_validationSchema.default.createMeetup), _MeetupController.default.create); // POST meet up RSVPS route /meetups/meetup_id/rsvps

router.post('/meetups/:meetup_id/rsvps', _MeetupController.default.meetupResponse); // GET get all meet ups route /meetups

router.get('/meetups/', _MeetupController.default.getAllMeetups); // GET get all upcoming meet ups route /meetups/upcoming/

router.get('/meetups/upcoming/', _MeetupController.default.getAllUpComing); // GET specific meet up record

router.get('/meetups/:meetup_id', _MeetupController.default.getSingleMeetup); // POST question route /meetups

router.post('/questions', _validate.default.validateBody(_validationSchema.default.createQuestion), _QuestionController.default.create); // PATCH up vote specific meetup question

router.patch('/questions/:question_id/upvote', _QuestionController.default.upvote); // PATCH down vote a specific meetup question

router.patch('/questions/:question_id/downvote', _QuestionController.default.downvote); // expose router to be use in another file

module.exports = router;
//# sourceMappingURL=index.js.map