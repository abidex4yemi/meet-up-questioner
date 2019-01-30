// Import external modules
import express from 'express';
import validate from '../../validations/validate';
import schema from '../../validationSchemas/validationSchema';
import MeetupController from '../../controllers/MeetupController';
import QuestionController from '../../controllers/QuestionController';
import CommentController from '../../controllers/CommentController';
import Auth from '../../middlewares/Auth';

const router = express.Router();

// POST meet up route /meetups
router.post('/meetups',
  validate.validateBody(schema.createMeetup),
  Auth.verifyToken,
  MeetupController.create);

// POST meet up RSVPS route /meetups/meetupId/rsvps
router.post('/meetups/:meetupId/rsvps',
  validate.validateBody(schema.rsvps),
  Auth.verifyToken,
  MeetupController.meetupResponse);

// POST meetup images route /meetups/meetupId/images
router.post('/meetups/:meetupId/images',
  Auth.verifyToken,
  validate.validateBody(schema.insertImages),
  MeetupController.insertImages);

// GET get all meet ups route /meetups
router.get('/meetups/',
  MeetupController.getAllMeetups);

// GET get all upcoming meet ups route /meetups/upcoming/
router.get('/meetups/upcoming/',
  MeetupController.getAllUpComing);

// GET specific meet up record
router.get('/meetups/:meetupId',
  MeetupController.getSingleMeetup);

// POST question route /meetups
router.post('/questions',
  Auth.verifyToken,
  validate.validateBody(schema.createQuestion),
  QuestionController.create);

// GET get all questions route /questions
router.get('/questions',
  QuestionController.getAllQuestion);

// POST comment route /comments/
router.post('/comments',
  Auth.verifyToken,
  validate.validateBody(schema.createComment),
  CommentController.create);

// GET get all comments route /comments
router.get('/comments',
  CommentController.getAllComment);

// PATCH up vote specific meetup question
router.patch('/questions/:questionId/upvote',
  Auth.verifyToken,
  QuestionController.upvote);

// PATCH down vote a specific meetup question
router.patch('/questions/:questionId/downvote',
  Auth.verifyToken,
  QuestionController.downvote);

router.delete('/meetups/:meetupId',
  Auth.verifyToken,
  MeetupController.deleteMeetup);

// expose router to be use in another file
export default router;
