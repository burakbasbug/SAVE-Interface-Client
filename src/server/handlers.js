const httpStatus = require('http-status-codes');
const Boom = require('boom');
const log = require('yalm');
const mqttService = require('../MqttClient');
const config = require('../../localConfig');
const simulatorService = require('./simulatorService');

const TRIGGER_TOPIC = config.mqtt.simulator.triggerTopic;

/**
 * Returns 200 OK and the JSON object.
 * @return {{simulationCycleRunning: *, mqttConnected: *}}
 */
const getStatus = () => ({
  simulationCycleRunning: simulatorService.getSimulationRunning(),
  mqttConnected: mqttService.clientConnected(),
});

const triggerSimulation = (request, h) => {
  log.info(request.method, request.path);
  try {
    mqttService.getConnection().publish(TRIGGER_TOPIC, 'Run!');
    simulatorService.triggerSimulationCycle();
    return h.code(httpStatus.OK);
  } catch (err) {
    return Boom.boomify(err);
  }
};

module.exports = {
  getStatus,
  triggerSimulation,
};
