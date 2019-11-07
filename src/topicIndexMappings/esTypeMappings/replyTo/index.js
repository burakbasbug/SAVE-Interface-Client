const es = require('../commonTypes');

// https://stackoverflow.com/questions/38847004/visualizing-a-single-string-of-text-in-kibana
module.exports = {
  correlationid: es.keywordNoIndex,
  replyto: es.keywordNoIndex,
  result: es.keywordNoIndex,
  timestamp: es.date,
};
