"use strict";

/**
 * Traverse array of object and return record if any
 * @param Array objArr
 * @param number objId
 */
module.exports = function (objArr, objId) {
  return objArr.find(function (element) {
    return element.id === objId;
  });
};
//# sourceMappingURL=findSingleRecord.js.map