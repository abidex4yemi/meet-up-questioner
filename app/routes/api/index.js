// Import external modules
import express from 'express';
import validate from '../../validations/validate';
import schema from '../../validationSchemas/validationSchema';
import MeetupController from '../../controllers/MeetupController';
import QuestionController from '../../controllers/QuestionController';

const router = express.Router();

// POST meet up route /meetups
router.post('/meetups', validate.validateBody(schema.createMeetup), MeetupController.create);

// GET get all meet ups route /meetups
router.get('/meetups/', MeetupController.getAllMeetups);

// GET get all upcoming meet ups route /meetups/upcoming/
router.get('/meetups/upcoming/', MeetupController.getAllUpComing);

// GET specific meet up record
router.get('/meetups/:meetup_id', MeetupController.getSingleMeetup);

// POST question route /meetups
router.post('/questions', validate.validateBody(schema.createQuestion), QuestionController.create);

// PATCH up vote specific meetup question
router.patch('/questions/:question_id/upvote', QuestionController.upvote);

// PATCH down vote a specific meetup question
router.patch('/questions/:question_id/downvote', QuestionController.downvote);

// expose router to be use in another file
module.exports = router;
