const Joi = require('@hapi/joi');
const log = require('yalm');
const _ = require('lodash');

const topicIndexMap = require('../topicIndexMap_GENERATED');

const schema = Joi.array().items(
  Joi.object({
    topic: Joi.string()
      .min(1)
      .required(),

    indexName: Joi.string()
      .lowercase()
      .disallow('\\', '/', '*', '?', '"', '<', '>', '|', ' ', '#', ',', ':')
      .pattern(/[^(_|+|\-)].*/)
      .min(1)
      .max(255)
      .required(),
  }).required()
);

const validateTopicIndexMap = () => {
  const { error } = schema.validate(topicIndexMap);
  if (error) {
    log.err(error.details);
    process.exit(1);
  }
  const dataLength = topicIndexMap.length;
  const uniqByTopic = _.uniqBy(topicIndexMap, 'topic');
  if (uniqByTopic.length !== dataLength) {
    log.err('There are multiple entries with same `topic` field!');
    process.exit(1);
  }
};

validateTopicIndexMap();
