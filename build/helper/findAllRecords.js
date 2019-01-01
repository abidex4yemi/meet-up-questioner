"use strict";

/**
 * Traverse all meetup records
 *
 * @param Array objArr
 * @returns Array allRecord
 */
module.exports = function (objArr) {
  if (objArr.length > 0) {
    var allRecord = objArr.map(function (current) {
      return {
        id: current.id,
        title: current.topic,
        location: current.location,
        happeningOn: current.happeningOn,
        tags: current.tags
      };
    });
    return allRecord;
  }

  return false;
};
//# sourceMappingURL=findAllRecords.js.map