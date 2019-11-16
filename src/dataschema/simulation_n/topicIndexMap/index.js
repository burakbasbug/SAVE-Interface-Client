/**
 * @file The module is responsible for collecting and generating the MQTT topics to elasticsearch index mappings.
 * Topic names in the file are stored as template strings to enable enumeration of the topics.
 * Each mapping json MUST have 3 fields: "topic", "es_index" and "indexMapping".
 */

const _ = require('lodash');
const { NUMBER_OF_MACHINES } = require('../../../../config').simulation;
const {
  PRODUCT,
  REPLY_TO,
  PERFORM_ACTION,
  NEW_STATE_INFORMATION,
  REQUESTS,
} = require('../elasticsearchIndices');

function to3Digits(nr) {
  return _.padStart(nr, 3, '0');
}

/**
 * MQTT-Topic - ES-Index mapping for topics with machine number.
 */
const ENUMERATED_TOPICS = i => [
  {
    topic: `<ConrodSimulator>/conveyorbelt/position${i}`,
    es_index: PRODUCT,
  },
  {
    topic: `<aco${to3Digits(i)}_sake>/sake/replyto`,
    es_index: REPLY_TO,
  },
  {
    topic: `<aco${to3Digits(i)}_adam>/adam/replyto`,
    es_index: REPLY_TO,
  },
  {
    topic: `<aco${to3Digits(i)}_code>/code/replyto`,
    es_index: REPLY_TO,
  },

  {
    topic: `<aco${to3Digits(i)}_adam>/adam/resetOtherCodeService`,
    es_index: REQUESTS,
  },
  {
    topic: `<aco${to3Digits(i)}_code>/code/processdata`,
    es_index: NEW_STATE_INFORMATION,
  },
  {
    topic: `<aco${to3Digits(i)}_adam>/adam/costEstimateLocalCodeService`,
    es_index: REQUESTS,
  },
  {
    topic: `<aco${to3Digits(i)}_adam>/adam/resetLocalCodeService`,
    es_index: REQUESTS,
  },
];

/**
 * MQTT-Topic - ES-Index mapping for particular topics.
 */
const CONSTANT_TOPICS = [
  {
    topic: '<ConrodSimulator>/OP_1/machinecommands',
    es_index: PERFORM_ACTION,
  },
  {
    topic: `<ConrodSimulator>/conveyorbelt/position${NUMBER_OF_MACHINES + 1}`,
    es_index: PRODUCT,
  },
];

function enumerateTopics() {
  const i = parseInt(NUMBER_OF_MACHINES, 10);
  if (_.isNaN(i) || i < 1) {
    throw new Error(
      `invalid environments variable: NUMBER_OF_MACHINES=${NUMBER_OF_MACHINES}`
    );
  }
  const objects = Array(i);
  // index + 1 because topics start from 1
  const enumeratedTopicsArray = _.map(objects, (obj, index) =>
    ENUMERATED_TOPICS(index + 1)
  );
  return _.flattenDeep([enumeratedTopicsArray, CONSTANT_TOPICS]);
}

module.exports = _.map(
  enumerateTopics(),
  ({ topic, es_index: { indexName } }) => ({
    topic,
    indexName,
  })
);
