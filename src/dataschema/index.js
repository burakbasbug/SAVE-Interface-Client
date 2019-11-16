/* eslint-disable global-require */
const log = require('yalm');
const { NUMBER_OF_MACHINES } = require('../../config').simulation;

const numberOfMachines = NUMBER_OF_MACHINES.toString().toLowerCase();
switch (numberOfMachines) {
  case 'example':
    log.info(`Active dataschema: ${numberOfMachines}`);
    module.exports = {
      elasticsearchIndices: require('./example1/elasticsearchIndices'),
      topicIndexMap: require('./example1/topicIndexMap'),
    };
    break;
  case '1':
    log.info(`Active dataschema: ${numberOfMachines}`);
    module.exports = {
      elasticsearchIndices: require('./simulation_1/elasticsearchIndices'),
      topicIndexMap: require('./simulation_1/topicIndexMap'),
    };
    break;
  default:
    log.info(`Active dataschema: ${numberOfMachines}`);
    module.exports = {
      elasticsearchIndices: require('./simulation_n/elasticsearchIndices_GENERATED'),
      topicIndexMap: require('./simulation_n/topicIndexMap_GENERATED'),
    };
    break;
}
