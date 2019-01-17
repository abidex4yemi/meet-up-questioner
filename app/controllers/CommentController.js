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
      const queryString = `INSERT INTO
      comments(questionId, userId, body)
      VALUES($1, $2, $3)
      returning *`;

      // insert record into database
      const {
        rows,
      } = await db.query(queryString, values);

      return res.status(201).json({
        status: 201,
        message: `Comment record addded to question with id: ${req.value.body.questionId}`,
        data: rows,
      });
    } catch (error) {
      return res.status(404).send({
        status: 404,
        errors: 'Question id does not exist',
      });
    }
  }
}

export default CommentController;
