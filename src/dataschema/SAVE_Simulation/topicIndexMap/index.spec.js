const Joi = require('@hapi/joi');
const log = require('yalm');
const _ = require('lodash');

const data = require('../topicIndexMap_GENERATED');

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

const validate = () => {
  const { error } = schema.validate(data);
  if (error) {
    log.err(error.details);
    process.exit(1);
  }
  const dataLength = data.length;
  const uniqByTopic = _.uniqBy(data, 'topic');
  if (uniqByTopic.length !== dataLength) {
    log.err('There are multiple entries with same `topic` field!');
    process.exit(1);
  }
};

validate();
