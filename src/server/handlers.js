const httpStatus = require('http-status-codes');
const Boom = require('boom');
const log = require('yalm');
const mqttService = require('../MqttClient');
const config = require('../../localConfig');
const simulatorService = require('./simulatorService');

const TRIGGER_TOPIC = config.mqtt.simulator.triggerTopic;

const getStatus = (req, reply) =>
  reply({
    simulationCycleRunning: simulatorService.getSimulationRunning(),
    mqttConnected: mqttService.clientConnected(),
  }).code(httpStatus.OK);

const triggerSimulation = (req, reply) => {
  log.info(req.method, req.path);
  try {
    mqttService.getConnection().publish(TRIGGER_TOPIC, 'Run!');
    simulatorService.triggerSimulationCycle();
    return reply().code(httpStatus.OK);
  } catch (err) {
    return reply(Boom.wrap(err));
  }
};

module.exports = {
  getStatus,
  triggerSimulation,
};
