// Import external modules
import express from 'express';
import validate from '../../validations/validate';
import schema from '../../validationSchemas/validationSchema';
import UserController from '../../controllers/UserController';

const router = express.Router();

router.post('/signup', validate.validateBody(schema.signUp), UserController.createAccount);

// expose router to be use in another file
export default router;
