// Import external modules
import express from 'express';
import validate from '../../validations/validate';
import schema from '../../validationSchemas/validationSchema';
import MeetupController from '../../controllers/MeetupController';
import QuestionController from '../../controllers/QuestionController';

const router = express.Router();

// Post meet up route /meetups
router.post('/meetups', validate.validateBody(schema.createMeetup), MeetupController.create);

// GET specific meet up record
router.get('/meetups/:meetup_id', MeetupController.getSingleMeetup);

// Post question route /meetups
router.post('/questions', validate.validateBody(schema.createQuestion), QuestionController.create);

// expose router to be use in another file
module.exports = router;
