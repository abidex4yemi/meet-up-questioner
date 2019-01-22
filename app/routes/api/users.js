// Import external modules
import express from 'express';
import validate from '../../validations/validate';
import schema from '../../validationSchemas/validationSchema';
import UserController from '../../controllers/UserController';

const router = express.Router();

// create account route
router.post('/signup',
  validate.validateBody(schema.signUp),
  UserController.createAccount);

//  user login route
router.post('/login',
  validate.validateBody(schema.logIn),
  UserController.logIn);

// expose router to be use in another file
export default router;
