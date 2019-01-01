"use strict";

/**
 * Traverse array of object and return index if any
 * @param Array objArr
 * @param number objId
 */
module.exports = function (objArr, objId) {
  return objArr.findIndex(function (element) {
    return element.id === objId;
  });
};
//# sourceMappingURL=findIndex.js.map