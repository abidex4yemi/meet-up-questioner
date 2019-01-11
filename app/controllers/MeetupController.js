// import external modules
import fs from 'fs';
import MeetupRecord from '../data/meetuprecord';
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
  static create(req, res) {
    // Set default value for optional fields if not set
    const images = req.value.body.images || '';
    const uniqueID = Helper.generateID(MeetupRecord.allMeetupRecord, 0);


    // get all post request body data
    const values = {
      id: uniqueID,
      createdOn: new Date().toUTCString(),
      location: req.value.body.location,
      images: [images],
      topic: req.value.body.topic,
      happeningOn: req.value.body.happeningOn,
      tags: req.value.body.tags,
    };

    try {
      // save record to data structure
      MeetupRecord.allMeetupRecord.unshift(values);

      // read meetup json file
      fs.writeFile('app/data/meetuprecord.json', JSON.stringify(MeetupRecord), 'utf8', (error) => {
        if (error) {
          Helper.logger().info(`MeetupRecord file not found: ${error}`);
        }
      });

      return res.status(201).json({
        status: 201,
        message: 'New Meet Up Record Created Successfully',
        data: [{
          topic: values.topic,
          location: values.location,
          happeningOn: values.happeningOn,
          tags: values.tags,
        }],
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
  static meetupResponse(req, res) {
    try {
      // Get and sanitize for valid integer
      const meetupId = Helper.filterInt(req.params.meetup_id);

      // Get a single meet up record
      const singleRecord = Helper.findSingleRecord(MeetupRecord
        .allMeetupRecord, meetupId);

      // if no matching question record
      if (typeof singleRecord === 'undefined') {
        return res.status(404).send({
          status: 404,
          message: 'No Meetup RSVP Record Found',
          error: 404,
        });
      }

      // get all matching data
      const meetupRsvp = {
        id: singleRecord.id,
        topic: singleRecord.topic,
        status: ['maybe'],
      };

      // save record to data structure
      MeetupRecord.allMeetupRsvp.unshift(meetupRsvp);

      // read meetup json file
      fs.writeFile('app/data/meetuprecord.json', JSON.stringify(MeetupRecord), 'utf8', (error) => {
        if (error) {
          Helper.logger().info(`MeetupRecord file not found: ${error}`);
        }
      });

      return res.status(201).json({
        message: 'Meetup RSVP record created',
        status: 201,
        data: [meetupRsvp],
      });
    } catch (error) {
      return res.status(404).send(error);
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
  static getSingleMeetup(req, res) {
    try {
      // Get valid integer
      const meetupId = Helper.filterInt(req.params.meetup_id);

      // Get a single meet up record
      const singleRecord = Helper.findSingleRecord(MeetupRecord
        .allMeetupRecord, meetupId);

      // On success
      return res.status(200).json({
        status: 200,
        data: [{
          topic: singleRecord.topic,
          location: singleRecord.location,
          happeningOn: singleRecord.happeningOn,
          tags: singleRecord.tags,
        }],
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
  static getAllMeetups(req, res) {
    try {
      const result = Helper.findAllRecords(MeetupRecord.allMeetupRecord);
      const totalRows = result.length;
      if (!result) {
        return res.status(404).send({
          message: 'No Record Found',
          error: 404,
        });
      }

      return res.status(200).json({
        status: 200,
        message: `${totalRows} Meet Up Records Found`,
        data: result,
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
  static getAllUpComing(req, res) {
    try {
      const result = Helper.findAllRecords(MeetupRecord.upcoming);

      const totalRows = result.length;

      if (!result) {
        return res.status(404).send({
          message: 'No Record Found',
          error: 404,
        });
      }

      return res.status(200).json({
        status: 200,
        message: `${totalRows} Upcoming Meet Up Records Found`,
        data: result,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}

// expose MeetupController to be use in another file
export default MeetupController;
