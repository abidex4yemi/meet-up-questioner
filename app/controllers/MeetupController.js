// import external modules
import moment from 'moment';
import db from '../db';
import Helper from '../helper/Helper';

class MeetupController {
  /**
   *
   * Create new meet up record
   *
   * @param object req
   * @param object res
   *
   * @returns object meetup object
   */
  static async create(req, res) {
    // check for admin user
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({
          status: 403,
          errors: 'Unauthorized!, Admin only route',
        });
    }
    // get all post request body data
    const values = [
      moment(new Date()),
      req.value.body.location,
      req.value.body.topic,
      req.value.body.happeningOn,
    ];

    const queryString = `INSERT INTO
      meetups(createdOn, location, topic, happeningOn)
      VALUES($1, $2, $3, $4)
      returning *`;

    try {
      // insert record into database
      const {
        rows,
      } = await db.query(queryString, values);

      return res.status(201).json({
        status: 201,
        message: 'New Meet Up Record Created Successfully',
        data: rows,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  /**
   *
   * Accept or decline scheduled meetup
   *
   * @param object req
   * @param object res
   *
   * @returns object meetupRsvp object
   */
  static async meetupResponse(req, res) {
    // Get and sanitize for valid integer
    const meetupId = Helper.filterInt(req.params.meetupId);

    const values = [
      meetupId,
      req.user.id,
      req.value.body.response,
    ];


    try {
      const queryString = `INSERT INTO
      rsvps(meetupId, userId, response)
      VALUES($1, $2, $3)
      returning *`;

      // insert record into database
      const {
        rows,
      } = await db.query(queryString, values);

      return res.status(201).json({
        message: 'Meetup RSVP record created',
        status: 201,
        data: rows,
      });
    } catch (error) {
      return res.status(404).send({
        status: 404,
        errors: 'Meetup record not found',
      });
    }
  }

  /**
   *
   * Get specific meet up record
   *
   * @param object req
   * @param object res
   *
   * @returns object meetup object
   */
  static async getSingleMeetup(req, res) {
    try {
      // Get valid integer
      const meetupId = Helper.filterInt(req.params.meetupId);

      // Get a single meet up record
      const queryString = 'SELECT * FROM meetups WHERE id = $1';

      const {
        rows,
      } = await db.query(queryString, [meetupId]);

      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: `Meetup record with id: ${meetupId} not found`,
        });
      }

      // On success
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(404).send({
        status: 404,
        errors: {
          message: 'Ooops error just occurred! meet up record not found',
          error,
        },
      });
    }
  }

  /**
   *
   * Get all all meet up record
   *
   * @param object req
   * @param object res
   *
   * @returns object meetup object
   */
  static async getAllMeetups(req, res) {
    try {
      const queryString = 'SELECT * FROM meetups';

      const {
        rows,
      } = await db.query(queryString);

      const totalRows = rows.length;

      if (!rows) {
        return res.status(404).send({
          message: 'No Record Found',
          error: 404,
        });
      }

      return res.status(200).json({
        status: 200,
        message: `${totalRows} Meet Up Records Found`,
        data: rows,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  /**
   *
   * Get all upcoming meetup records
   *
   * @param object req
   * @param object res
   *
   * @returns object meetup object
   */
  static async getAllUpComing(req, res) {
    try {
      const queryString = 'SELECT * FROM meetups WHERE status = $1';

      const {
        rows,
      } = await db.query(queryString, ['yes']);

      const totalRows = rows.length;

      // check if any record exist
      if (!rows.length > 0) {
        return res.status(404).send({
          message: 'No Upcoming Meetup Record Found',
          error: 404,
        });
      }

      return res.status(200).json({
        status: 200,
        message: `${totalRows} Upcoming Meet Up Records Found`,
        data: rows,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async deleteMeetup(req, res) {
    // check for admin user
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({
          status: 403,
          errors: 'Unauthorized!, Admin only route',
        });
    }

    try {
      // Get valid integer
      const meetupId = Helper.filterInt(req.params.meetupId);

      // Get a single meet up record
      const queryString = 'DELETE FROM meetups WHERE id = $1 returning *';

      const {
        rows,
      } = await db.query(queryString, [meetupId]);

      // Check if record with request id exist
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          error: `Meetup record with id: ${meetupId} not found`,
        });
      }

      // On success
      return res.status(200).send({
        status: 200,
        message: 'Meetup record deleted successfully',
        data: rows,
      });
    } catch (error) {
      return res.status(404).send({
        status: 404,
        errors: {
          message: 'Ooops error just occurred! meet up record not found',
          error,
        },
      });
    }
  }
}

// expose MeetupController to be use in another file
export default MeetupController;
