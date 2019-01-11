import winston from 'winston';
/**
 * Helper class that holds helper methods
 */
class Helper {
  /**
   * Traverse all meetup records
   *
   * @param Array objArr
   * @returns Array allRecord
   */
  static findAllRecords(objArr) {
    if (objArr.length > 0) {
      const allRecord = objArr.map(current => ({
        id: current.id,
        title: current.topic,
        location: current.location,
        happeningOn: current.happeningOn,
        tags: current.tags,
      }));

      return allRecord;
    }
    return false;
  }

  /**
   * Traverse array of object and return record if any
   * @param Array objArr
   * @param number objId
   */
  static findSingleRecord(objArr, objId) {
    return objArr.find(element => element.id === objId);
  }

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

  /**
   * Traverse array of object and return index if any
   * @param Array objArr
   * @param number objId
   */
  static findIndex(objArr, objId) {
    return objArr.findIndex(element => element.id === objId);
  }

  /**
   *
   * @param Array objArr
   * @param number index
   */
  static generateID(objArr, index) {
    return ((objArr.length > 0) ? objArr[index].id + 1 : 0);
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
}

// expose MeetupController to be use in another file
export default Helper;
