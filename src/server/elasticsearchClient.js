const _ = require('lodash');
const rp = require('request-promise');
const log = require('yalm');
const bluebird = require('bluebird');
const { elasticsearch } = require('../../localConfig');
const topicIndexNameMapping = require('../topicIndexMapping');

/**
 * https://www.elastic.co/guide/en/elasticsearch/reference/6.8/docs-index_.html#_automatic_id_generation
 */
async function indexDocument(index, doc) {
  const uri = `${elasticsearch.url}/${sanitizeIndexName(index)}/_doc/`;
  const body = doc;
  log.info('POST ', uri);
  log.debug(`POST body: ${body}`);

  const opts = {
    method: 'POST',
    uri,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    resolveWithFullResponse: true, // get response object instaed of body directly
    simple: false,
  };
  await rp(opts).then(res => {
    log.debug(`POST response ${res.statusCode}`);
    if (!(res.statusCode === 200 || res.statusCode === 201)) {
      log.error(
        `Request status code: ${res.statusCode}, response: ${res.body}`,
        'DOCUMENT: ',
        doc
      );
    }
  });
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
 * https://www.elastic.co/guide/en/elasticsearch/reference/6.8/indices-create-index.html#_skipping_types
 */
async function createIndices() {
  if (!elasticsearch.removeIndicesAtStartup) {
    await bluebird.resolve();
  }
  log.info('creating indices');
  const indicesToCreate = _.map(
    topicIndexNameMapping,
    ({ topic, mappings }) => {
      const indexName = sanitizeIndexName(topic);
      const settingsWithMappings = {
        settings,
        mappings,
      };
      const body = JSON.stringify(settingsWithMappings);
      log.debug('[createIndices]', 'request options:', body);
      return {
        uri: `${elasticsearch.url}/${indexName}?include_type_name=false`,
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
        simple: false,
      };
    }
  );
  const reqs = _.map(indicesToCreate, rp);
  await bluebird
    .all(reqs)
    .tap(() => log.info('Indices created successfully!'))
    .tapCatch(() => log.err('Index creation failed!'));
}

/*

create index: PUT /indexname/typename
create docu : POST /indexname/typename

 */

/**
 Elasticsearch index name limitations:
 There are several limitations to what you can name your index. The complete list of limitations are:

 Lowercase only
 Cannot include \, /, *, ?, ", <, >, |, ` ` (space character), ,, #
 Indices prior to 7.0 could contain a colon (:), but that’s been deprecated and won’t be supported in 7.0+
 Cannot start with -, _, +
 Cannot be . or ..
 Cannot be longer than 255 bytes (note it is bytes, so multi-byte characters will count towards the 255 limit faster)
 * @param str
 * @return {string}
 */
function sanitizeIndexName(str) {
  return _.toLower(str)
    .replace(/\//g, '_')
    .replace('<', '')
    .replace('>', '');
}

const topics = _.map(topicIndexNameMapping, 'topic');
const indices = _.map(topics, sanitizeIndexName);

module.exports = {
  topics,
  indices,
  cleanIndexes: deleteIndices,
  indexDocument,
  createIndices,
  disableAutoIndexCreation,
};
