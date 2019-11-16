const httpStatus = require('http-status-codes');
const Boom = require('@hapi/boom');
const log = require('yalm');
const mqttService = require('../mqttClient');
const config = require('../../config');
const simulatorService = require('./simulatorService');

const TRIGGER_TOPIC = config.mqttClient.simulator.triggerTopic;
const CALLBACK_TOPIC = config.mqttClient.simulator.callbackTopic;

/**
 * Returns 200 OK and the JSON object.
 * @return {{simulationCycleRunning: *, mqttConnected: *}}
 */
const getStatus = () => ({
  simulationCycleRunning: simulatorService.getSimulationRunning(),
  mqttConnected: mqttService.clientConnected(),
});

const getTriggerMessage = () =>
  JSON.stringify({
    correlationid: Math.random(),
    replyto: CALLBACK_TOPIC,
    parameter: {},
    timestamp: new Date().getTime(),
  });

const triggerSimulation = (request, h) => {
  log.info(request.method, request.path);
  if (!mqttService.clientConnected()) {
    return new Boom('No MQTT Connection!');
  }
  try {
    mqttService.getConnection().publish(TRIGGER_TOPIC, getTriggerMessage());
    simulatorService.triggerSimulationCycle();
    log.info('simulation cycle triggered');
    return h.response().code(httpStatus.OK);
  } catch (err) {
    log.debug(err.message);
    return Boom.boomify(err);
  }
};

module.exports = {
  getStatus,
  triggerSimulation,
};
