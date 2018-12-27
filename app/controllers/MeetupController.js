// import external modules
import fs from 'fs';
import MeetupRecord from '../data/meetuprecord';

/**
 * MeetupController object export
 *
 */
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
    // generate unique id
    const generateUUID = () => {
      let d = new Date().getTime();
      if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); // use high-precision timer if available
      }
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (d + Math.random() * 16) % 16 | 0;
        // eslint-disabled "no-bitwise", "no-mixed-operators"
        d = Math.floor(d / 16);
        // eslint-disabled "no-bitwise", "no-mixed-operators"
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
    };

    // Set default value for optional fields if not set
    const images = req.value.body.images || '';
    const tag = req.value.body.tags || '';
    const dateCreated = new Date().toUTCString();
    const uniqueID = generateUUID();


    // get all post request body data
    const values = {
      id: uniqueID,
      createdOn: dateCreated,
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
