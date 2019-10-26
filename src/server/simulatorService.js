const Boom = require('boom');
// const log = require('yalm');
// const config = require('../../localConfig');

let simulationCycleRunning;

function getSimulationRunning() {
  return simulationCycleRunning;
}

function setSimulationRunning(status) {
  simulationCycleRunning = !!status;
}

function triggerSimulationCycle() {
  if (simulationCycleRunning) {
    throw Boom.tooManyRequests('simulation is still running');
  }
  simulationCycleRunning = true;
}

module.exports = {
  getSimulationRunning,
  setSimulationRunning,
  triggerSimulationCycle,
};
