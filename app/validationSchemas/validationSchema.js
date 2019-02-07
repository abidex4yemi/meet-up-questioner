// Import external modules
import Joi from 'joi';

export default {
  createMeetup: Joi.object().keys({
    // location must be a valid string is required
    location: Joi.string()
      .required()
      .trim()
      .label('Event location'),

    // tags is not optional
    tags: Joi.array().items(Joi.string().required()).required(),

    // images is optional
    images: Joi.array().items(Joi.string()).optional(),

    // topic must be a valid string is required
    topic: Joi.string().max(100)
      .label('Meetup topic')
      .trim()
      .required(),

    // createdOn is required and must be a date
    happeningOn: Joi.date()
      .label('Event date')
      .required(),
  }),
  createQuestion: Joi.object().keys({
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
  }),
  getOneMeetup: Joi.object().keys({
    // id is required and must be integer
    id: Joi.number()
      .integer()
      .min(0)
      .positive()
      .required(),
  }),
  signUp: Joi.object().keys({
    // firname must be a valid string and is required
    firstname: Joi.string()
      .regex(/^[a-zA-Z]+$/).error(() => 'Firstname is required and must be alphabet')
      .max(100)
      .label('Firstname')
      .trim()
      .required(),
    // lastname must be a valid string and is required
    lastname: Joi.string()
      .regex(/^[a-zA-Z]+$/).error(() => 'Lastname is required and must be alphabet')
      .max(100)
      .label('Lastname')
      .trim()
      .required(),
    // password must be a valid string and is required
    password: Joi.string()
      .min(6)
      .max(100)
      .label('Password')
      .trim()
      .required(),
    // confirm password must be a valid string and is required
    passwordConf: Joi.string()
      .min(6)
      .max(100)
      .valid(Joi.ref('password'))
      .label('Confirm Password')
      .trim()
      .options({
        language: {
          any: {
            allowOnly: 'must match password',
          },
        },
      }),
    // firname must be a valid string and is required
    email: Joi.string()
      .email()
      .label('Email')
      .trim()
      .required(),
    // phoneNumber must be a valid string and is required
    phonenumber: Joi.number()
      .integer()
      .label('Phonenumber')
      .optional(),
    // username must be a valid string and is required
    username: Joi.string()
      .min(3)
      .trim()
      .label('Username')
      .optional(),
  }),
  logIn: Joi.object().keys({
    // email must be a valid string and is required
    email: Joi.string()
      .email()
      .label('Email')
      .trim()
      .required(),
    // password must be a valid string and is required
    password: Joi.string()
      .min(6)
      .max(100)
      .label('Password')
      .trim()
      .required(),
  }),
  rsvps: Joi.object().keys({
    // password must be a valid string and is required
    response: Joi.string().regex(/^[a-zA-Z]+$/).error(() => 'Response is required and must be alphabet')
      .label('Response')
      .trim()
      .required(),
  }),
  createComment: Joi.object().keys({
    // comment body is required and must be a string
    commentBody: Joi.string()
      .max(500)
      .label('Comment body')
      .trim()
      .required(),
    questionId: Joi.number()
      .label('Question id')
      .required(),
  }),
  insertImages: Joi.object().keys({
    // images is not optional
    images: Joi.array().items(Joi.string().required()).required(),
  }),
};
