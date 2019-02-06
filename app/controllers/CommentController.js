import db from '../db';

class CommentController {
  /**
   *
   * Create new comment record
   *
   * @param object req
   * @param object res
   *
   * @returns object question object
   */
  static async create(req, res) {
    // get all post request body data
    const values = [
      req.value.body.questionId,
      req.user.id,
      req.value.body.commentBody,
    ];

    try {
      // insert record into database
      const queryString = `INSERT INTO
      comments(questionid, userid, commentbody)
      VALUES($1, $2, $3)
      returning *`;

      const {
        rows,
      } = await db.query(queryString, values);

      // fetch record from database
      const fetchQuery = 'SELECT questions.id AS question, questions.title, questions.body, comments.commentbody AS comment FROM questions LEFT JOIN comments ON comments.questionid = questions.id WHERE questions.id = $1 AND comments.id = $2';

      const allRows = await db.query(fetchQuery, [req.value.body.questionId, rows[0].id]);

      return res.status(201).json({
        status: 201,
        message: 'Successfully commented on question',
        data: allRows.rows,
      });
    } catch (errors) {
      return res.status(404).json({
        status: 404,
        error: 'Question id does not exist',
      });
    }
  }

  /**
   * Get all users posted question comments
   *
   * @param {*} req
   * @param {*} res
   */
  static async getAllComment(req, res) {
    try {
      const queryString = 'SELECT comments.questionid, comments.userid, comments.commentbody AS comment, questions.title, questions.body AS body, questions.createdOn, questions.votes FROM questions LEFT JOIN comments ON comments.questionid = questions.id WHERE questions.id = comments.questionid ORDER BY comments.id DESC';

      const {
        rows,
      } = await db.query(queryString);

      // check if any record exist
      if (!rows.length > 0) {
        return res.status(404).json({
          status: 404,
          error: 'No users comment Record Found',
        });
      }

      return res.status(200).json({
        status: 200,
        message: 'These are users comments',
        data: rows,
      });
    } catch (errors) {
      return res.status(400).json({
        status: 400,
        error: 'Something went wrong, try again',
      });
    }
  }

  /**
   * Get total number of commented questions by user id
   *
   * @param {*} req
   * @param {*} res
   */
  static async getCommentByUserId(req, res) {
    try {
      const queryString = 'SELECT COUNT(*) FROM comments WHERE comments.userid = $1';

      const {
        rows,
      } = await db.query(queryString, [req.user.id]);

      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'Something went wrong, try again',
      });
    }
  }
}

export default CommentController;
