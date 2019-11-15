module.exports = {
  logLevel: 'debug',
  simulation: {
    NUMBER_OF_MACHINES: 2,
  },
  http: {
    host: '0.0.0.0',
    // host: 'localhost',
    port: '3000',
    routes: {
      cors: true,
    },
  },
  mqtt: {
    clientName: 'SAVE-Interface-Client',
    host: 'mosquitto',
    port: '1883',
    // host: 'localhost', // config: /usr/local/etc/mosquitto/mosquitto.conf
    // port: '8883',
    simulator: {
      callbackTopic: '<SystemLauncher>/SystemLauncher_CommFunction/replyto',
      triggerTopic: '<ConrodSimulator>/ConrodSimulatorController/execute',
      $meta: 'topics for managing the simulator via http endpoints.',
    },
  },
  elasticsearch: {
    url: 'http://elasticsearch:9200',
    // url: 'localhost:9200',
    removeIndicesAtStartup: true,
    settings: {},
  },
};
