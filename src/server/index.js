/* eslint-disable global-require */
const hapi = require('@hapi/hapi');
const log = require('yalm');

const config = require('../../localConfig');

const hapiConnection = new hapi.Server(config.http);
const pkg = require('../../package.json');
const { getConnection } = require('../MqttClient');
const routes = require('./routes');
const elasticsearchService = require('./elasticsearchClient');

const registerPlugins = async () => {
  await hapiConnection.register({
    plugin: require('@hapi/vision'),
  });
  await hapiConnection.register({
    plugin: require('@hapi/inert'),
  });
};

module.exports.start = async () => {
  process.title = pkg.name;
  log.info(`${pkg.name} starting`);
  try {
    await registerPlugins();
    await hapiConnection.start();
    hapiConnection.route(routes);
    log.info(`HTTP SERVER: ${JSON.stringify(hapiConnection.info)}`);
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
      await hapiConnection.stop();
    } else if (err.message) {
      log.err(err.message);
    } else {
      log.err('ERROR WITHOUT .message FIELD!!', err);
    }
  }
};
