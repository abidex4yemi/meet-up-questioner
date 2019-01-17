import moment from 'moment';
import jwt from '../middlewares/Auth';
import db from '../db';
import Helper from '../helper/Helper';


class UserController {
  /**
   * Create user account
   *
   * @param {object} req
   * @param {object} res
   */
  static async createAccount(req, res) {
    const hashedPassword = Helper.hashPassword(req.value.body.password);

    const queryString = `INSERT INTO users(firstname, lastname, email, phonenumber, username,  password, registered, isadmin)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8) returning id, firstname, lastname, email, phonenumber, username, isadmin`;

    const values = [
      req.value.body.firstname,
      req.value.body.lastname,
      req.value.body.email,
      req.value.body.phonenumber,
      req.value.body.username,
      hashedPassword,
      moment(new Date()),
      'f',
    ];

    try {
      // insert record into database
      const { rows } = await db.query(queryString, values);

      const token = jwt.generateToken(
        rows[0].id,
        rows[0].isadmin,
        rows[0].firstname,
        rows[0].email,
      );

      return res.status(201).json({
        status: 201,
        data: [{
          token,
          user: rows[0],
        }],
      });
    } catch (errors) {
      if (errors.routine === '_bt_check_unique') {
        return res.status(400).json({
          status: 400,
          errors: 'User already exist',
        });
      }
      return res.status(400).json({
        status: 400,
        errors,
      });
    }
  }

  static async logIn(req, res) {
    const queryString = 'SELECT * FROM users WHERE email = $1';

    try {
      // Select all user record where email is equal db email
      const {
        rows,
      } = await db.query(queryString, [req.value.body.email]);

      // check if user exist in database
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          errors: 'User not Found',
        });
      }

      // compare user provided password against db
      if (!Helper.comparePassword(req.value.body.password, rows[0].password)) {
        return res
          .status(404)
          .json({
            status: 404,
            errors: 'Email/Password incorrect',
          });
      }

      // generate token
      const token = jwt.generateToken(
        rows[0].id,
        rows[0].isadmin,
        rows[0].firstname,
        rows[0].email,
      );

      // return success message
      return res.status(200).json({
        status: 200,
        data: [{
          token,
          message: 'Loged in',
          user: {
            Firstname: rows[0].firstname,
            Lastname: rows[0].lastname,
            Email: rows[0].email,
            Phonenumber: rows[0].phonenumber,
            Username: rows[0].username,
          },
        }],
      });
    } catch (errors) {
      return res.status(400).json({
        status: 400,
        errors,
      });
    }
  }
}

export default UserController;
