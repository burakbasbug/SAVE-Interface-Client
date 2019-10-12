const { triggerSimulation, getStatus } = require('./handlers');

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
];
