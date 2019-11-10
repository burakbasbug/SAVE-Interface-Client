const { triggerSimulation, getStatus } = require('./handlers');
const simulatorService = require('./simulatorService');

module.exports = [
  {
    method: 'POST',
    path: '/simulation/trigger',
    handler: triggerSimulation,
  },
  {
    method: 'GET',
    path: '/simulation/status',
    handler: getStatus,
  },
  {
    method: 'GET',
    path: '/simulation/reset',
    handler: () => {
      simulatorService.setSimulationRunning(false);
      return {};
    },
  },
];
