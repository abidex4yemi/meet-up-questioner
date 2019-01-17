import winston from 'winston';
import bcrypt from 'bcrypt';
/**
 * Helper class that holds helper methods
 */
class Helper {
  /**
   * Filter value for valid integer number
   * @param {*} value
   *
   * @returns false
   */
  static filterInt(value) {
    if (/^(\\-|\+)?([0-9]+|Infinity)$/.test(value)) {
      return Number(value);
    }
    return false;
  }

  static logger() {
    return winston.createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: 'app.log',
        }),
      ],
    });
  }

  /**
   * Hash password
   *
   * @param {*} password
   */
  static hashPassword(password) {
    return bcrypt.hashSync(password, 8);
  }

  /**
   * Compare hashedPassword against user password
   * @param {*} password
   * @param {*} hashedPassword
   */
  static comparePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }
}

// expose MeetupController to be use in another file
export default Helper;
