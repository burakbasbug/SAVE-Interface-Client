const es = require('../commonTypes');

module.exports = {
  'action1.properties': {
    id: es.keywordNoIndex,
    'parameters.properties': {
      threshold: es.float,
      preasure: es.float,
    },
  },
  'action2.properties': {
    id: es.keywordNoIndex,
    'parameters.properties': {
      description: es.keyword,
      machine_code: es.keyword,
    },
  },
  // usecase_id: REMOVED
  timestamp: es.date,
  // type: REMOVED,
};
