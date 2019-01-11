// import external modules
import fs from 'fs';
import QuestionRecord from '../data/questionrecord.json';
import Helper from '../helper/Helper';

class QuestionController {
  /**
   *
   * Create new question record
   *
   * @param object req
   * @param object res
   *
   * @returns object question object
   */
  static create(req, res) {
    const uniqueID = Helper.generateID(QuestionRecord.allQuestionRecord, 0);

    // get all post request body data
    const values = {
      id: uniqueID,
      createdOn: new Date().toUTCString(),
      createdBy: req.value.body.createdBy,
      meetup: req.value.body.meetup,
      title: req.value.body.title,
      body: req.value.body.body,
      votes: 0,
    };

    try {
      // save record to data structure
      QuestionRecord.allQuestionRecord.unshift(values);

      // read question json file
      fs.writeFile('app/data/questionrecord.json', JSON.stringify(QuestionRecord), 'utf8', (error) => {
        if (error) {
          Helper.logger().info(`QuestionRecord file not found: ${error}`);
        }
      });

      return res.status(200).json({
        status: 201,
        message: 'New Meetup Question Record Created Successfully',
        data: [{
          user: values.createdBy,
          meetup: values.meetup,
          title: values.title,
          body: values.body,
        }],
      });
    } catch (error) {
      return res.status(400).end({
        status: 400,
        errors: {
          error,
        },
      });
    }
  }

  /**
   *
   * Upvote a specific question record
   *
   * @param object req
   * @param object res
   *
   * @returns object question object
   */
  static upvote(req, res) {
    try {
      // Get and sanitize for valid integer
      const questionId = Helper.filterInt(req.params.question_id);

      // Get a single meet up record
      const singleRecordIndex = Helper.findIndex(QuestionRecord
        .allQuestionRecord, questionId);

      // if no matching question record
      if (singleRecordIndex === -1) {
        return res.status(404).send({
          status: 404,
          message: 'No Question Record Found',
          error: 404,
        });
      }

      // question being upvoted
      const upvotedQuestion = QuestionRecord.allQuestionRecord[singleRecordIndex];

      // increase vote
      const updateVotes = {
        id: upvotedQuestion.id,
        createdOn: upvotedQuestion.createdOn,
        createdBy: upvotedQuestion.createdBy,
        meetup: upvotedQuestion.meetup,
        title: upvotedQuestion.title,
        body: upvotedQuestion.body,
        votes: upvotedQuestion.votes + 1,
      };

      // Update question record
      QuestionRecord.allQuestionRecord.splice(singleRecordIndex, 1, updateVotes);
      // read question json file
      fs.writeFile('app/data/questionrecord.json', JSON.stringify(QuestionRecord), 'utf8', (error) => {
        if (error) {
          Helper.logger().info(`QuestionRecord file not found: ${error}`);
        }
      });

      return res.status(200).json({
        status: 200,
        message: 'Question upvoted successfully',
        data: [{
          meetup: updateVotes.meetup,
          title: updateVotes.title,
          body: updateVotes.body,
          votes: updateVotes.votes,
        }],
      });
    } catch (error) {
      return res.status(404).end({
        status: 404,
        errors: {
          error,
        },
      });
    }
  }

  /**
   *
   * Downvote a specific question record
   *
   * @param object req
   * @param object res
   *
   * @returns object question object
   */
  static downvote(req, res) {
    try {
      // Get and sanitize for valid integer
      const questionId = Helper.filterInt(req.params.question_id);

      // Get a single meet up record
      const singleRecordIndex = Helper.findIndex(QuestionRecord
        .allQuestionRecord, questionId);

      // if no matching question record
      if (singleRecordIndex === -1) {
        return res.status(404).send({
          status: 404,
          message: 'No Question Record Found',
          error: 404,
        });
      }

      // question being upvoted
      const upvotedQuestion = QuestionRecord.allQuestionRecord[singleRecordIndex];

      // increase vote
      const updateVotes = {
        id: upvotedQuestion.id,
        createdOn: upvotedQuestion.createdOn,
        createdBy: upvotedQuestion.createdBy,
        meetup: upvotedQuestion.meetup,
        title: upvotedQuestion.title,
        body: upvotedQuestion.body,
        votes: upvotedQuestion.votes - 1,
      };

      // Update question record
      QuestionRecord.allQuestionRecord.splice(singleRecordIndex, 1, updateVotes);
      // read question json file
      fs.writeFile('app/data/questionrecord.json', JSON.stringify(QuestionRecord), 'utf8', (error) => {
        if (error) {
          Helper.logger().info(`QuestionRecord file not found: ${error}`);
        }
      });

      return res.status(200).json({
        status: 200,
        message: 'Question Downvoted successfully',
        data: [{
          meetup: updateVotes.meetup,
          title: updateVotes.title,
          body: updateVotes.body,
          votes: updateVotes.votes,
        }],
      });
    } catch (error) {
      return res.status(404).end({
        status: 404,
        errors: {
          error,
        },
      });
    }
  }
}

// expose QuestionController to be use in another file
export default QuestionController;
