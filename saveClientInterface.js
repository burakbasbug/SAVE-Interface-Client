const log = require('yalm');
const servers = require('./src/server');
const config = require('./config');

log.setLevel(config.logLevel);

servers.start().catch(log.error);
