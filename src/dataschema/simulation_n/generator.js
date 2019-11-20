const fs = require('fs');
const { Parser } = require('json2csv');
const _ = require('lodash');
const log = require('yalm');
const topicIndexMappingsGenerator = require('./topicIndexMap');
const elasticsearchIndices = require('./elasticsearchIndices');

const topicIndexMappingFile = 'topicIndexMap_GENERATED';
const elasticsearchIndicesFile = 'elasticsearchIndices_GENERATED';

const numberOfMachines = process.argv[2];
const i = parseInt(numberOfMachines, 10);
if (_.isNaN(i) || i < 1) {
  log.err(`Invalid number of machines: ${numberOfMachines}
  Usage: npm run build:map NUMBER_OF_MACHINES`);
  process.exit(1);
}

function generateCSV(data) {
  const fields = ['topic', 'indexName'];
  const opts = { fields };
  const parser = new Parser(opts);
  const sortedData = _.sortBy(data, ['topic']);
  const csv = parser.parse(sortedData);
  fs.writeFileSync(`${__dirname}/dataschema_GENERATED.csv`, csv);
}

try {
  const topicIndexMappings = topicIndexMappingsGenerator(i);
  log.info(
    `Creating simulation dataschema for ${numberOfMachines} machines...`
  );
  fs.writeFileSync(
    `${__dirname}/${topicIndexMappingFile}.json`,
    JSON.stringify(topicIndexMappings, null, 2)
  );
  fs.writeFileSync(
    `${__dirname}/${elasticsearchIndicesFile}.json`,
    JSON.stringify(_.values(elasticsearchIndices), null, 2)
  );
  generateCSV(topicIndexMappings);
  log.info('DONE ✅ ');
} catch (e) {
  log.err(e);
  process.exit(1);
}
