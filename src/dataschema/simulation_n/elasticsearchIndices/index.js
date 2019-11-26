const dotObject = require('dot-object');
const product = require('./PRODUCTS');
const replyTo = require('./REPLYTO');
const requests = require('./REQUESTS');
const newStateInformation = require('./NEW_STATE_INFORMATION');
const performAction = require('./PERFORM_ACTION');

const PRODUCT = {
  properties: dotObject.object(dotObject.dot(product)),
};

const REPLY_TO = {
  properties: dotObject.object(dotObject.dot(replyTo)),
};

const PERFORM_ACTION = {
  properties: dotObject.object(dotObject.dot(performAction)),
};

const NEW_STATE_INFORMATION = {
  properties: dotObject.object(dotObject.dot(newStateInformation)),
};

const REQUESTS = {
  properties: dotObject.object(dotObject.dot(requests)),
};

module.exports = {
  INTERMEDIATE_PRODUCTS: {
    indexName: 'intermediate_products',
    indexMappings: PRODUCT,
  },
  FINAL_PRODUCTS: {
    indexName: 'final_products',
    indexMappings: PRODUCT,
  },
  REPLY_TO: {
    indexName: 'replyto',
    indexMappings: REPLY_TO,
  },
  REQUESTS: {
    indexName: 'requests',
    indexMappings: REQUESTS,
  },
  NEW_STATE_INFORMATION: {
    indexName: 'new_state_information',
    indexMappings: NEW_STATE_INFORMATION,
  },
  PERFORM_ACTION: {
    indexName: 'perform_action',
    indexMappings: PERFORM_ACTION,
  },
};
