module.exports = {
  logLevel: 'debug', // debug, info, warn, error, silent
  simulation: {
    activeDataschema: 'simulation', // or 'example'
    triggerTopic: '<ConrodSimulator>/ConrodSimulatorController/execute', // topic to trigger a simulation cycle
    callbackTopic: '<SystemLauncher>/SystemLauncher_CommFunction/replyto', // topic to call when the triggered cycle is done
  },
  http: {
    host: '0.0.0.0', // 0.0.0.0 for docker, otherwise 'localhost'
    port: '3000',
    routes: {
      cors: true, // mandatory for localhost requests
    },
  },
  mqtt: {
    clientName: 'SAVE-Interface-Client',
    brokerHost: 'mosquitto', // mosquitto within docker, otherwise 'localhost'
    brokerPort: '1883', // brew config: /usr/local/etc/mosquitto/mosquitto.conf
  },
  elasticsearch: {
    url: 'http://elasticsearch:9200', // elasticsearch:9200 for docker, otherwise 'localhost:9200'
    resetIndicesAtStartup: true, // true = remove all existing indices and create again
  },
};
