const Boom = require('@hapi/boom');
// const log = require('yalm');

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
