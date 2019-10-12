const log = require('yalm');

module.exports = err => {
  log.error(`can not connect${err}`);
};
