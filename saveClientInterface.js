const log = require('yalm');
const servers = require('./src/server');
const config = require('./localConfig');

log.setLevel(config.logLevel);

servers.start().catch(log.error);
