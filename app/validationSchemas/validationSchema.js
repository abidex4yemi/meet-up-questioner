/**
 * Import external modules
 */
import Joi from 'joi';

module.exports = {
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
};
