const es = require('./commonTypes');

const featureObj = {
  name: es.keywordNoIndex,
  unit: es.keywordNoIndex,
  description: es.keywordNoIndex,
  value: es.float,
};

module.exports = {
  ADDRESS: es.keyword,
  AGENT: es.keyword,
  'VALUE.properties': {
    name: es.keyword,
    machine_state: es.keyword,
    'featuremap.properties': {
      'GAuntenquer.properties': featureObj,
      'GAobenquer.properties': featureObj,
      'Bend.properties': featureObj,
      'GAuntenlngs.properties': featureObj,
      'GAobenlngs.properties': featureObj,
      'KAobenlngs.properties': featureObj,
    },
    usecase_id: es.keywordNoIndex,
    timestamp: es.keywordNoIndex,
    type: es.keywordNoIndex,
  },
  timeStamp: es.date,
};
