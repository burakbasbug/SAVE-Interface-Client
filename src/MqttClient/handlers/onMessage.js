const log = require('yalm');
const _ = require('lodash');
const { indexDocument } = require('../../server/elasticsearchClient');
const config = require('../../../localConfig');
const simulatorService = require('../../server/simulatorService');

const CALLBACK_TOPIC = config.mqtt.simulator.callbackTopic;

module.exports = (topic, message) => {
  // message is a buffer!
  log.debug(
    'onMessageHandler',
    'received msg. Topic: ',
    topic,
    ', msg: ',
    message.toString()
  );

  if (!topic.retain) {
    if (topic === CALLBACK_TOPIC) {
      log.debug('onMessageHandler', 'Simulation cycle completed!');
      simulatorService.setSimulationRunning(false);
    } else {
      // TODO 1: switch case yapip abone olunan topiclere göre kategorileme?
      // TODO 2: development yaparken böyle isObject mi diye validationdan gecir ama uygulamanin son halinde buna gerek yok
      // cünkü burda önce parse edip sonra tekrar stringify ediyorum. Bunun yerine gelen json-stringini direk gönder.
      indexDocument(topic, message.toString());
    }
  }
};
