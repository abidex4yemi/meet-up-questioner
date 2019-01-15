import jwt from 'jsonwebtoken';
import db from '../db';

class Auth {
  /**
   * Generate token based on payload.
   *
   * @param {*} id
   * @param {*} isAdmin
   * @param {*} username
   * @param {*} email
   */
  static generateToken(id, isAdmin, username, email) {
    const token = jwt.sign({
      id,
      isAdmin,
      username,
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
    const token = req.headers['x-access-token'];

    // check if token is provided
    if (!token) {
      return res
        .status(403)
        .json({
          status: 403,
          errors: 'Unauthorized!, you have to login',
        });
    }

    try {
      // verify user provided token against existing token
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
      const query = 'SELECT * FROM users WHERE id = $1';
      const {
        rows,
      } = await db.query(query, [decoded.id]);

      // check for valid app users
      if (!rows[0]) {
        return res.status(403).send({
          status: 403,
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
