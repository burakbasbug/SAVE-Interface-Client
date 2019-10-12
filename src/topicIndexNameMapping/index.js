const { FEATURE_MAP, REPLY_TO } = require('./esTypes');

const machine1 = [
  {
    topic: '<aco001_sake>/sake/replyto',
    mappings: REPLY_TO,
  },
  {
    topic: '<aco001_adam>/adam/replyto',
    mappings: REPLY_TO,
  },
  {
    topic: '<aco001_code>/code/replyto',
    mappings: REPLY_TO,
  },
];

const machine2 = [
  {
    topic: '<aco002_sake>/sake/replyto',
    mappings: REPLY_TO,
  },
  {
    topic: '<aco002_adam>/adam/replyto',
    mappings: REPLY_TO,
  },
  {
    topic: '<aco002_code>/code/replyto',
    mappings: REPLY_TO,
  },
];

const positions = [
  {
    topic: '<ConrodSimulator>/conveyorbelt/position1',
    mappings: FEATURE_MAP,
  },
  {
    topic: '<ConrodSimulator>/conveyorbelt/position2',
    mappings: FEATURE_MAP,
  },
  {
    topic: '<ConrodSimulator>/conveyorbelt/position3',
    mappings: FEATURE_MAP,
  },
];

module.exports = [
  // ...machine1,
  // ...machine2,
  ...positions,
];
