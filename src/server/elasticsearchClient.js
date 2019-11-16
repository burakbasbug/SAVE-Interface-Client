const _ = require('lodash');
const rp = require('request-promise');
const log = require('yalm');
const bluebird = require('bluebird');
const { elasticsearch } = require('../../config');
const topicIndexMap = require('../dataschema/simulation_n/topicIndexMap_GENERATED');
const elasticsearchIndices = require('../dataschema/simulation_n/elasticsearchIndices_GENERATED');

/**
 * https://www.elastic.co/guide/en/elasticsearch/reference/6.8/docs-index_.html#_automatic_id_generation
 */
async function indexDocument(messageSourceTopic, doc) {
  const { indexName } = _.find(topicIndexMap, { topic: messageSourceTopic });
  const uri = `${elasticsearch.url}/${indexName}/_doc/`;
  const body = doc;
  const opts = {
    uri,
    body,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    resolveWithFullResponse: true, // get response object instaed of body directly
    simple: false,
  };
  try {
    const res = await rp(opts);
    log.debug(`POST ${uri}`, `body: ${body}`, `response ${res.statusCode}`);
    if (res.statusCode !== 200 && res.statusCode !== 201) {
      log.error(
        `Request status code: ${res.statusCode}, response: ${res.body}. 'DOCUMENT: '${doc}`
      );
    }
  } catch (e) {
    log.err('[indexDocument]', e);
  }
}

async function deleteIndices() {
  if (!elasticsearch.removeIndicesAtStartup) {
    return bluebird.resolve();
  }
  log.info('deleting elasticsearch indices');
  return rp
    .delete(`${elasticsearch.url}/*,-.kibana*`)
    .then(res => log.debug('deleteIndices', res));
}

// function checkConnection() {
//   return rp(elasticsearch.url, {
//     simple: false,
//     resolveWithFullResponse: true,
//   }).then(res => {
//     if (res.statusCode !== 200) {
//       throw new Error('No ES connection');
//     }
//   });
// }

function disableAutoIndexCreation() {
  const body = { persistent: { 'action.auto_create_index': 'false' } };
  return rp.put(`${elasticsearch.url}/_cluster/settings`, {
    body,
    json: true,
  });
}

const settings = {
  number_of_replicas: 0,
  number_of_shards: 1,
  analysis: {},
  refresh_interval: '5s',
};

/**
 * Builds HTTP Request options to create an Elasticsearch Index using Elasticsearch's "Create index API".
 * @param indexname
 * @param indexMappings
 * @returns {{headers: {'Content-Type': string}, method: string, simple: boolean, body: *, uri: string}}
 */
const buildRequestOptions = ({ indexName, indexMappings }) => {
  const settingsWithMappings = {
    settings,
    mappings: indexMappings,
  };
  const body = JSON.stringify(settingsWithMappings);
  log.debug(`[createIndices] request options: ${body}`);
  return {
    body,
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    uri: `${elasticsearch.url}/${indexName}?include_type_name=false`,
    simple: true,
  };
};

/**
 * https://www.elastic.co/guide/en/elasticsearch/reference/6.8/indices-create-index.html#_skipping_types
 */
async function createIndices() {
  if (!elasticsearch.removeIndicesAtStartup) {
    await bluebird.resolve();
  }
  log.info('creating indices');
  const indicesToCreate = _.map(elasticsearchIndices, buildRequestOptions);
  const requestsPromise = _.map(indicesToCreate, rp);
  await bluebird
    .all(requestsPromise)
    .tap(() => log.info('Indices created successfully!'))
    .tapCatch(() => log.err('Index creation failed!'));
}

module.exports = {
  cleanIndexes: deleteIndices,
  indexDocument,
  createIndices,
  disableAutoIndexCreation,
};
