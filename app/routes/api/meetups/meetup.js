/**
 *  Import external modules
 */
import express from 'express';
import schemas from '../../../validationSchemas/validationSchema';
import validate from '../../../validations/validate';

/**
 * import custom modules
 */
import MeetupController from '../../../controllers/MeetupController';

const router = express.Router();

// meet up route /meetups
router.post('/meetups',
  validate.validateBody(schemas.createMeetup),
  MeetupController.create);

// expose router to be use in another file
module.exports = router;
