const { PRODUCT, REPLY_TO, PERFORM_ACTION } = require('./esTypes');

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

const product = [
  {
    topic: '<ConrodSimulator>/conveyorbelt/position1',
    mappings: PRODUCT,
  },
  {
    topic: '<ConrodSimulator>/conveyorbelt/position2',
    mappings: PRODUCT,
  },
  {
    topic: '<ConrodSimulator>/conveyorbelt/position3',
    mappings: PRODUCT,
  },
];

const action = [
  {
    topic: '<ConrodSimulator>/OP_1/machinecommands',
    mappings: PERFORM_ACTION,
  },
];
module.exports = [...machine1, ...machine2, ...product, ...action];
