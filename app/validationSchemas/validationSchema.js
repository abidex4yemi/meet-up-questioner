// Import external modules
import Joi from 'joi';

export default {
  createMeetup: Joi.object().keys({
    // id is required and must be integer
    id: Joi.number()
      .integer()
      .min(0)
      .positive(),

    // createdOn is required and must be a date
    createdOn: Joi.date(),

    // topic must be a valid string is required
    location: Joi.string()
      .required()
      .trim()
      .label('Event location'),

    // images is optional
    images: Joi.any().tags(['image1']),

    // topic must be a valid string is required
    topic: Joi.string().max(100)
      .label('Meet up topic')
      .trim()
      .required(),

    // createdOn is required and must be a date
    happeningOn: Joi.string().trim()
      .label('Event date')
      .required(),

    // topic must be a valid string is required
    tags: Joi.any()
      .tags(['api'])
      .required(),
  }),
  createQuestion: Joi.object().keys({
    // id is required and must be integer
    id: Joi.number()
      .integer()
      .min(0)
      .positive(),

    // createdOn is required and must be a date
    createdOn: Joi.date(),

    // user id must be a valid integer is required
    createdBy: Joi.number()
      .integer()
      .min(0)
      .positive()
      .required()
      .label('User id'),

    // meetup topic must be integer and required
    meetup: Joi.number()
      .integer()
      .min(0)
      .positive()
      .required()
      .label('Meet up id'),

    // question title must be a valid string is required
    title: Joi.string().max(100)
      .label('Question title')
      .trim()
      .required(),

    // question body is required and must be a string
    body: Joi.string().max(500)
      .label('Question body')
      .trim()
      .required(),

    // topic must be a valid string is required
    vote: Joi.number()
      .integer().default(0),
  }),
  getOneMeetup: Joi.object().keys({
    // id is required and must be integer
    id: Joi.number()
      .integer()
      .min(0)
      .positive()
      .required(),
  }),
};
