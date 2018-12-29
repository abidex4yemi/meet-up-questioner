// import external modules
import fs from 'fs';
import QuestionRecord from '../data/questionrecord.json';

const QuestionController = {
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
    let uniqueID;
    if (QuestionRecord.allQuestionRecord.length > 0) {
      uniqueID = QuestionRecord.allQuestionRecord[0].id + 1;
    } else {
      uniqueID = 0;
    }


    // get all post request body data
    const values = {
      id: uniqueID,
      createdOn: new Date().toUTCString(),
      createdBy: req.value.body.createdBy,
      meetup: req.value.body.meetup,
      title: req.value.body.title,
      body: req.value.body.body,
      votes: 0,
    };

    try {
      // save record to data structure
      QuestionRecord.allQuestionRecord.unshift(values);

      // read question json file
      fs.writeFile('app/data/questionrecord.json', JSON.stringify(QuestionRecord), 'utf8', (error, next) => {
        if (error) {
          next(error);
        }
      });

      return res.status(200).json({
        status: 200,
        message: 'New Meet Question Record Created Successfully',
        data: [{
          user: values.createdBy,
          meetup: values.meetup,
          title: values.title,
          body: values.body,
        }],
      });
    } catch (error) {
      return res.status(400).end({
        status: 400,
        errors: {
          error,
        },
      });
    }
  },
};

// expose QuestionController to be use in another file
export default QuestionController;
