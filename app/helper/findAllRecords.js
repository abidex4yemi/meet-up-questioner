/**
 * Traverse all meetup records
 *
 * @param Array objArr
 * @returns Array allRecord
 */
module.exports = (objArr) => {
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
};
