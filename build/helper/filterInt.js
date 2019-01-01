"use strict";

/**
  * Filter value for valid integer number
  * @param {*} value
  *
  * @returns false
  */
module.exports = function (value) {
  if (/^(\\-|\+)?([0-9]+|Infinity)$/.test(value)) {
    return Number(value);
  }

  return false;
};
//# sourceMappingURL=filterInt.js.map