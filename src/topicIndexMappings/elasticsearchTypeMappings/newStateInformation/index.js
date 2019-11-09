const es = require('../commonTypes');

module.exports = {
  correlationid: es.keywordNoIndex,
  replyto: es.keywordNoIndex,
  'parameter.properties.data.properties': {
    'featuremap.properties.GAobenlngs.properties': {
      name: es.disabled,
      SD: es.float,
      SDriftStatus: es.keyword,
      SubState: es.int,
      driftStatuses: es.keyword,
      inputDataStatus: es.keyword,
      subStateSequence: es.keyword,
      OriginalValue: es.float,
      AVGDriftStatus: es.keyword,
    },
    usecase_id: es.keywordNoIndex,
    timestamp: es.disabled,
    type: es.disabled,
  },
  timeStamp: es.date,
};
