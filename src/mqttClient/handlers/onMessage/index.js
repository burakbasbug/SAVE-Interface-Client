const log = require('yalm');
const _ = require('lodash');
const { indexDocument } = require('../../../server/elasticsearchClient');
const config = require('../../../../config');
const simulatorService = require('../../../server/simulatorService');

const CALLBACK_TOPIC = config.simulation.callbackTopic;
const REPLYTO_TOPIC = /.*\/replyto/;
const ACTIONS_TOPIC = /.*\/OP_1\/machinecommands/;

module.exports = (msgTopic, messageBuffer) => {
  let message = messageBuffer.toString();
  log.debug(`'onMessageHandler: From ${msgTopic} MESSAGE: ${message}`);
  if (msgTopic.retain) {
    return;
  }
  const topic = msgTopic.toString();
  if (topic === CALLBACK_TOPIC) {
    onSimulationEnd();
    return;
  } else if (topic.match(REPLYTO_TOPIC)) {
    message = onReplyto(message);
  } else if (topic.match(ACTIONS_TOPIC)) {
    message = onPerformAction(message);
  }
  indexDocument(topic, message);
};

function onSimulationEnd() {
  if (simulatorService.getSimulationRunning()) {
    simulatorService.setSimulationRunning(false);
    log.info('onMessageHandler', 'simulation cycle completed');
  } else {
    log.debug('onMessageHandler', 'No cycle to complete');
  }
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

function onPerformAction(msg) {
  const { actions } = JSON.parse(msg);
  if (actions && actions[0] && actions[1]) {
    return JSON.stringify({
      action1: actions[0],
      action2: actions[1],
      timestamp: new Date().getTime(),
    });
  }
  log.err('Object does not match the mapping!', msg);
  return null;
}
