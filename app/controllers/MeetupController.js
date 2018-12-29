// import external modules
import fs from 'fs';
import MeetupRecord from '../data/meetuprecord';

const MeetupController = {
  /**
   *
   * Create new meet up record
   *
   * @param object req
   * @param object res
   *
   * @returns object meetup object
   */
  async create(req, res) {
    // Set default value for optional fields if not set
    const images = req.value.body.images || '';
    const tag = req.value.body.tags || '';
    let uniqueID;
    if (MeetupRecord.allMeetupRecord.length > 0) {
      uniqueID = MeetupRecord.allMeetupRecord[0].id + 1;
    } else {
      uniqueID = 0;
    }


    // get all post request body data
    const values = {
      id: uniqueID,
      createdOn: new Date().toUTCString(),
      location: req.value.body.location,
      images: [images],
      topic: req.value.body.topic,
      happeningOn: req.value.body.happeningOn,
      tags: tag,
    };

    try {
      // save record to data structure
      MeetupRecord.allMeetupRecord.unshift(values);

      // read meetup json file
      fs.writeFile('app/data/meetuprecord.json', JSON.stringify(MeetupRecord), 'utf8', (error) => {
        if (error) {
          res.status(400).end();
        }
      });

      return res.status(200).json({
        status: 200,
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
  },
};

// expose MeetupController to be use in another file
export default MeetupController;
