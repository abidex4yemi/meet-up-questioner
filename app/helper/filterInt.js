/**
  * Filter value for valid integer number
  * @param {*} value
  *
  * @returns number | NaN
  */
module.exports = (value) => {
  if (/^(\\-|\+)?([0-9]+|Infinity)$/.test(value)) {
    return Number(value);
  }
  return NaN;
};
