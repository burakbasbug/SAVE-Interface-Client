/**
 * @file The module is responsible for collecting and generating the MQTT topics to elasticsearch index mappings.
 * Topic names in the file are stored as template strings to enable enumeration of the topics.
 * Each mapping json MUST have 3 fields: "topic", "targetElasticsearchIndexname" and "indexMapping".
 */

const _ = require('lodash');
const { NUMBER_OF_MACHINES } = require('../../localConfig').simulation;
const {
  PRODUCT,
  REPLY_TO,
  PERFORM_ACTION,
  NEW_STATE_INFORMATION,
  REQUESTS,
} = require('./elasticsearchTypeMappings');

function to3Digits(nr) {
  return _.padStart(nr, 3, '0');
}

/**
 * MQTT-Topic - ES-Index mapping for topics with machine number.
 */
const ENUMERATED_TOPICS = topicIndex => {
  const i = parseInt(topicIndex, 10);
  if (_.isNaN(i) || i < 1) {
    throw new Error('invalid topic number input');
  }

  return [
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

    {
      topic: `<aco${to3Digits(i)}_adam>/adam/resetOtherCodeService`,
      targetElasticsearchIndexName: 'requests',
      indexMappings: REQUESTS,
    },
    {
      topic: `<aco${to3Digits(i)}_code>/code/processdata`,
      targetElasticsearchIndexName: 'new_state_information',
      indexMappings: NEW_STATE_INFORMATION,
    },
    {
      topic: `<aco${to3Digits(i)}_adam>/adam/costEstimateLocalCodeService`,
      targetElasticsearchIndexName: 'requests',
      indexMappings: REQUESTS,
    },
    {
      topic: `<aco${to3Digits(i)}_adam>/adam/resetLocalCodeService`,
      targetElasticsearchIndexName: 'requests',
      indexMappings: REQUESTS,
    },
  ];
};

/**
 * MQTT-Topic - ES-Index mapping for particular topics.
 */
const CONSTANT_TOPICS = [
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
  // {
  //   topic: `<aco001_sake>/sake/processdata`,
  //   targetElasticsearchIndexName: 'product??',
  //   indexMappings: PRODUCT,
  // },
];

function enumerateTopics() {
  const objects = Array(NUMBER_OF_MACHINES);
  // index + 1 because topics start from 1
  return _.map(objects, (obj, index) => ENUMERATED_TOPICS(index + 1));
}

module.exports = _.flattenDeep([enumerateTopics(), CONSTANT_TOPICS]);
// readme'ye bunun notu eklenecek diye todo notu koy.
