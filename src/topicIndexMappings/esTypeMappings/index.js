const dotObject = require('dot-object');
const product = require('./product');
const replyTo = require('./replyTo');
// const yasdasdkasjbda = require('./requestReset');
const performAction = require('./actions');

module.exports.PRODUCT = {
  properties: dotObject.object(dotObject.dot(product)),
};

module.exports.REPLY_TO = {
  properties: dotObject.object(dotObject.dot(replyTo)),
};

module.exports.PERFORM_ACTION = {
  properties: dotObject.object(dotObject.dot(performAction)),
};
