const log = require('yalm');
const _ = require('lodash');
const { indexDocument } = require('../../../server/elasticsearchClient');
const config = require('../../../../localConfig');
const simulatorService = require('../../../server/simulatorService');

const CALLBACK_TOPIC = config.mqtt.simulator.callbackTopic;
const REPLYTO_TOPIC = /.*\/replyto/;
const PRODUCT_TOPIC = /conveyorbelt\/position[0-9]+/;

module.exports = (topic, messageBuffer) => {
  let message = messageBuffer.toString();
  log.debug(`'onMessageHandler: From ${topic} MESSAGE: ${message}`);
  if (topic.retain) {
    return;
  }
  if (topic === CALLBACK_TOPIC) {
    onSimulationEnd();
    return;
  }

  if (topic.toString().match(REPLYTO_TOPIC)) {
    message = onReplyto(message);
  }

  // if (topic.toString().match(PRODUCT_TOPIC)) {}

  indexDocument(topic, message);
};

function onSimulationEnd() {
  log.debug('onMessageHandler', 'Simulation cycle completed!');
  simulatorService.setSimulationRunning(false);
}

/**
 * returns esTypes.replyTo
 */
function onReplyto(msg) {
  const message = JSON.parse(msg);
  const { result } = message;
  if (_.isObject(result)) {
    if (_.get(result, 'result.type')) {
      const res = _.get(result, 'result.type', '');
      return JSON.stringify(_.set(message, 'result', res));
    } else if (_.get(result, 'type')) {
      const res = _.get(result, 'type', '');
      return JSON.stringify(_.set(message, 'result', res));
    }
  }
  return msg;
}
