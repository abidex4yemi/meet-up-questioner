/**
 * Traverse array of object and return record if any
 * @param Array objArr
 * @param number objId
 */
module.exports = (objArr, objId) => objArr.find(element => element.id === objId);
