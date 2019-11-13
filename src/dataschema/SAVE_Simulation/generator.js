const fs = require('fs');
const { Parser } = require('json2csv');
const _ = require('lodash');
const log = require('yalm');
const topicIndexMappings = require('./topicIndexMap');
const elasticsearchIndices = require('./elasticsearchIndices');

const topicIndexMappingFile = 'topicIndexMap_GENERATED';
const elasticsearchIndicesFile = 'elasticsearchIndices_GENERATED';

function generateCSV(data) {
  const fields = ['topic', 'indexName'];
  const opts = { fields };
  const parser = new Parser(opts);
  const sortedData = _.sortBy(data, ['topic']);
  const csv = parser.parse(sortedData);
  fs.writeFileSync(`${__dirname}/dataschema_GENERATED.csv`, csv);
}

try {
  fs.writeFileSync(
    `${__dirname}/${topicIndexMappingFile}.json`,
    JSON.stringify(topicIndexMappings, null, 2)
  );
  fs.writeFileSync(
    `${__dirname}/${elasticsearchIndicesFile}.json`,
    JSON.stringify(_.values(elasticsearchIndices), null, 2)
  );
  generateCSV(topicIndexMappings);
} catch (e) {
  log.err(e);
  process.exit(1);
}
