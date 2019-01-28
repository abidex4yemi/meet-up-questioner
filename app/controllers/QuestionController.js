// import external modules
import moment from 'moment';
import Helper from '../helper/Helper';
import db from '../db';

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
  static async create(req, res) {
    // get all post request body data
    const values = [
      moment(new Date()),
      req.user.id,
      req.value.body.meetup,
      req.value.body.title,
      req.value.body.body,
    ];

    try {
      const queryString = `INSERT INTO
      questions(createdOn, createdBy, meetup, title, body)
      VALUES($1, $2, $3, $4, $5)
      returning createdBy AS user, meetup, title, body`;

      // insert record into database
      const {
        rows,
      } = await db.query(queryString, values);

      return res.status(201).json({
        status: 201,
        message: 'New Meetup Question Record Created Successfully',
        data: rows,
      });
    } catch (errors) {
      return res.status(404).json({
        status: 404,
        error: 'Meetup id does not exist',
      });
    }
  }

  /**
   * Get all user ask questions
   *
   * @param {*} req
   * @param {*} res
   */
  static async getAllQuestion(req, res) {
    try {
      const queryString = 'SELECT * FROM questions';

      const {
        rows,
      } = await db.query(queryString);

      const totalRows = rows.length;

      // check if no record
      if (!rows) {
        return res.status(404).json({
          status: 404,
          error: 'No Record Found',
        });
      }

      return res.status(200).json({
        status: 200,
        message: `${totalRows} question Records Found`,
        data: rows,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'Something went wrong, try again',
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
  static async upvote(req, res) {
    try {
      // Get and sanitize for valid integer
      const questionId = Helper.filterInt(req.params.questionId);

      const queryString = 'UPDATE questions SET votes = votes + 1 WHERE id = $1 returning meetup, title, body, votes';

      const {
        rows,
      } = await db.query(queryString, [questionId]);

      // check if record id exist
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: `No Question Record Found with id: ${questionId}`,
        });
      }

      return res.status(200).json({
        status: 200,
        message: 'Question upvoted successfully',
        data: rows,
      });
    } catch (errors) {
      return res.status(404).json({
        status: 404,
        error: 'No Question Record Found',
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
  static async downvote(req, res) {
    try {
      // Get and sanitize for valid integer
      const questionId = Helper.filterInt(req.params.questionId);

      const queryString = 'UPDATE questions SET votes = votes - 1 WHERE id = $1 returning meetup, title, body, votes';

      const {
        rows,
      } = await db.query(queryString, [questionId]);

      // check if record id exist
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: `No Question Record Found with id: ${questionId}`,
        });
      }

      return res.status(200).json({
        status: 200,
        message: 'Question downvoted successfully',
        data: rows,
      });
    } catch (errors) {
      return res.status(404).json({
        status: 404,
        error: 'No Question Record Found',
      });
    }
  }
}

// expose QuestionController to be use in another file
export default QuestionController;
