"use strict";

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import external modules
module.exports = {
  createMeetup: _joi.default.object().keys({
    // id is required and must be integer
    id: _joi.default.number().integer().min(0).positive(),
    // createdOn is required and must be a date
    createdOn: _joi.default.date(),
    // topic must be a valid string is required
    location: _joi.default.string().required().trim().label('Event location'),
    // images is optional
    images: _joi.default.any().tags(['image1']),
    // topic must be a valid string is required
    topic: _joi.default.string().max(100).label('Meet up topic').trim().required(),
    // createdOn is required and must be a date
    happeningOn: _joi.default.string().trim().label('Event date').required(),
    // topic must be a valid string is required
    tags: _joi.default.any().tags(['api']).required()
  }),
  createQuestion: _joi.default.object().keys({
    // id is required and must be integer
    id: _joi.default.number().integer().min(0).positive(),
    // createdOn is required and must be a date
    createdOn: _joi.default.date(),
    // user id must be a valid integer is required
    createdBy: _joi.default.number().integer().min(0).positive().required().label('User id'),
    // meetup topic must be integer and required
    meetup: _joi.default.number().integer().min(0).positive().required().label('Meet up id'),
    // question title must be a valid string is required
    title: _joi.default.string().max(100).label('Question title').trim().required(),
    // question body is required and must be a string
    body: _joi.default.string().max(500).label('Question body').trim().required(),
    // topic must be a valid string is required
    vote: _joi.default.number().integer().default(0)
  }),
  getOneMeetup: _joi.default.object().keys({
    // id is required and must be integer
    id: _joi.default.number().integer().min(0).positive().required()
  })
};
//# sourceMappingURL=validationSchema.js.map