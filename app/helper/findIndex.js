/**
 * Traverse array of object and return index if any
 * @param Array objArr
 * @param number objId
 */
module.exports = (objArr, objId) => objArr.findIndex(element => element.id === objId);
