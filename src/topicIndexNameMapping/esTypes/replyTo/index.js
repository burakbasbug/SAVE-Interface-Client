const es = require('../commonTypes');

module.exports = {
  correlationid: {
    type: 'keyword',
    index: false,
  },
  replyto: es.keyword,
  result: es.disabled,
  timestamp: es.date,
};
