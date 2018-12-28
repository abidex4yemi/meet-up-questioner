import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import validate from './validations/validate';
import schema from './validationSchemas/validationSchema';
import meetup from './routes/api/meetups/meetup';

// Initialize express app
const app = express();

// body-parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cross origin resource sharing middleware
app.use(cors());

// Meet up  middleware
app.use('/api/v1/', validate.validateBody(schema.createMeetup), meetup);

// Home page route
app.get('/', (req, res) => {
  res.json(
    {
      status: 200,
      data: [{
        message: 'Welcome to Questioner Landing page',
      }],
    },
  );
});

// Handle non exist route with with proper message
app.all('*', (req, res) => {
  res.status(400).json({
    status: 404,
    error: {
      message: 'Wrong request. Route does not exist',
    },
  });
});

// Define application port number
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
  // eslint-disable no-console
  console.log(`Server running on port ${port}`);
});

// expose app to be use in another file
export default app;
