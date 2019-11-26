const es = require('./commonTypes');

// https://stackoverflow.com/questions/38847004/visualizing-a-single-string-of-text-in-kibana
/**
 * The field "result" has inconsistency as it gets string or object literals as value. Since the dynamic types
 * are not supported by elasticsearch, the field "result" will be stringified and stored as string.
 */
module.exports = {
  correlationid: es.keywordNoIndex,
  replyto: es.keywordNoIndex,
  result: es.keywordNoIndex, // !!
  timestamp: es.date,
};
