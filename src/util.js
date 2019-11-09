const fs = require('fs');
const { Parser } = require('json2csv');
const _ = require('lodash');
const log = require('yalm');
const topicIndexMappings = require('./topicIndexMappings/generateMapping');

const FILE_NAME = 'GENERATED_TOPIC_INDEX_MAPPINGS';

function generateCSV(data) {
  const fields = ['topic', 'targetElasticsearchIndexName']; //
  const opts = { fields };
  const parser = new Parser(opts);
  const sortedData = _.sortBy(data, ['topic']);
  const csv = parser.parse(sortedData);
  fs.writeFileSync(`${__dirname}/${FILE_NAME}.csv`, csv);
}

function generateJSON(data) {
  fs.writeFileSync(
    `${__dirname}/${FILE_NAME}.json`,
    JSON.stringify(data, null, 2)
  );
}

try {
  generateJSON(topicIndexMappings);
  generateCSV(topicIndexMappings);
} catch (e) {
  log.err(e);
  process.exit(1);
}
