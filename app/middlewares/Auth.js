import jwt from 'jsonwebtoken';
import db from '../db';

class Auth {
  /**
   * Generate token based on payload.
   *
   * @param {*} id
   * @param {*} isAdmin
   * @param {*} firstname
   * @param {*} email
   */
  static generateToken(id, isAdmin, firstname, email) {
    const token = jwt.sign({
      id,
      isAdmin,
      firstname,
      email,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '24h',
    });

    return token;
  }

  /**
   * Verifies user provided token
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async verifyToken(req, res, next) {
    const { token } = req.headers;

    // check if token is provided
    if (!token) {
      return res
        .status(401)
        .json({
          status: 401,
          errors: 'Unauthorized!, you have to login',
        });
    }

    try {
      // verify user provided token against existing token
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);

      const queryString = 'SELECT * FROM users WHERE id = $1';
      const {
        rows,
      } = await db.query(queryString, [decoded.id]);
      // console.log(rows);

      // check for valid app users
      if (!rows[0]) {
        return res.status(401).send({
          status: 401,
          errors: 'The token you provided is invalid',
        });
      }

      // get user id
      req.user = decoded;

      return next();
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  }
}

export default Auth;
