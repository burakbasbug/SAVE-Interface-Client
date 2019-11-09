const _ = require('lodash');
const { NUMBER_OF_MACHINES } = require('../../localConfig').simulation;
const { PRODUCT, REPLY_TO, PERFORM_ACTION } = require('./ES_TYPE_MAPPINGS');

const to3Digits = nr => _.padStart(nr, 3, '0');
const getTopicsEnumerated = topicIndex => {
  const i = parseInt(topicIndex, 10);
  if (_.isNaN(i) || i < 1) {
    throw new Error('invalid topic number input');
  }

  /**
   * MQTT-Topic - ES-Index mapping for enumerated topics.
   */
  const MAP_ENUMERATED_TOPICS = [
    {
      topic: `<ConrodSimulator>/conveyorbelt/position${i}`,
      targetElasticsearchIndexName: `product${i}`,
      indexMappings: PRODUCT,
    },
    {
      topic: `<aco${to3Digits(i)}_sake>/sake/replyto`,
      targetElasticsearchIndexName: 'replyto',
      indexMappings: REPLY_TO,
    },
    {
      topic: `<aco${to3Digits(i)}_adam>/adam/replyto`,
      targetElasticsearchIndexName: 'replyto',
      indexMappings: REPLY_TO,
    },
    {
      topic: `<aco${to3Digits(i)}_code>/code/replyto`,
      targetElasticsearchIndexName: 'replyto',
      indexMappings: REPLY_TO,
    },
  ];
  return MAP_ENUMERATED_TOPICS;
};

/**
 * MQTT-Topic - ES-Index mapping for particular topics.
 */
const MAP_CONSTANT_TOPICS = [
  {
    topic: '<ConrodSimulator>/OP_1/machinecommands',
    targetElasticsearchIndexName: 'machinecommand',
    indexMappings: PERFORM_ACTION,
  },
  {
    topic: `<ConrodSimulator>/conveyorbelt/position${NUMBER_OF_MACHINES + 1}`,
    targetElasticsearchIndexName: `product${NUMBER_OF_MACHINES + 1}`,
    indexMappings: PRODUCT,
  },
];

const enumeratedTopics = () => {
  const objects = Array(NUMBER_OF_MACHINES);
  // index + 1 because topics start from 1
  return _.map(objects, (obj, index) => getTopicsEnumerated(index + 1));
};

module.exports = _.flattenDeep([enumeratedTopics(), MAP_CONSTANT_TOPICS]);
