const hapi = require('hapi');
const log = require('yalm');

const hapiServer = new hapi.Server();
const config = require('../../localConfig');
const pkg = require('../../package.json');
const { getConnection } = require('../MqttClient');
const routes = require('./routes');
const elasticsearchService = require('./elasticsearchClient');

module.exports.start = async () => {
  process.title = pkg.name;
  log.info(`${pkg.name} starting`);
  try {
    hapiServer.connection(config.http);
    hapiServer.route(routes);
    await hapiServer.start();
    await elasticsearchService.cleanIndexes();
    await elasticsearchService.disableAutoIndexCreation();
    await elasticsearchService.createIndices();
    log.info('elasticsearch indices are ready');
    getConnection();
    log.info('mqtt connection is set!');
  } catch (err) {
    if (err.name === 'RequestError') {
      log.err(
        err.message,
        ` --- Make sure elasticsearch is running on ${config.elasticsearch.url}`
      );
    } else if (err.message) {
      log.err(err.message);
    } else {
      log.err(err, 'ERROR WITHOUT .message FIELD!!');
    }
  }
};
