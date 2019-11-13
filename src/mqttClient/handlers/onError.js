const log = require('yalm');
const simulatorService = require('../../server/simulatorService');

module.exports = err => {
  simulatorService.setSimulationRunning(false);
  log.error(`can not connect${err}`);
};
