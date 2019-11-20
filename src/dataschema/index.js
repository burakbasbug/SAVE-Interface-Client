/* eslint-disable global-require */
const log = require('yalm');
const { activeDataschema } = require('../../config').simulation;

const dataschema = activeDataschema.toString().toLowerCase();
switch (dataschema) {
  case 'example':
    log.info(`Active dataschema: example`);
    module.exports = {
      elasticsearchIndices: require('./example1/elasticsearchIndices'),
      topicIndexMap: require('./example1/topicIndexMap'),
    };
    break;
  case 'simulation':
    log.info(`Active dataschema: simulation`);
    module.exports = {
      elasticsearchIndices: require('./simulation_n/elasticsearchIndices_GENERATED'),
      topicIndexMap: require('./simulation_n/topicIndexMap_GENERATED'),
    };
    break;
  default:
    throw new Error(`Invalid name for activeDataschema: ${activeDataschema}`);
}
