const dotObject = require('dot-object');
const es = require('../commonTypes');

const mappings = {
  action1: {
    id: es.keywordNoIndex,
    'parameters.properties': {
      threshold: es.float,
      preasure: es.float,
    },
  },
  action2: {
    id: es.keywordNoIndex,
    'parameters.properties': {
      description: es.keyword,
      machine_code: es.keyword,
    },
  },
  usecase_id: es.keywordNoIndex,
  timestamp: es.int,
  // type: REMOVED,
};

module.exports = {
  mappings: dotObject.object(mappings),
};
