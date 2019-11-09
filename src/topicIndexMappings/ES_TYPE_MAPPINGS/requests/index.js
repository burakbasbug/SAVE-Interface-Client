const es = require('../commonTypes');

module.exports = {
  correlationid: es.keywordNoIndex,
  replyto: es.keyword,
  'parameter.properties.Request.properties': {
    featuremap: es.disabled,
    usecase_id: es.disabled,
    timestamp: es.disabled,
    type: es.keyword,
  },
  timestamp: es.date,
};
// TOPIC: iki topic icin de ayni durum: 'parameter.type' disinda parameter fieldinin hicbir fieldi maplenmeyecek
