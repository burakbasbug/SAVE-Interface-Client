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
    brokerUrl: 'mqtt://mosquitto:1883',
    // brokerUrl: 'mqtt://localhost:8883', // config: /usr/local/etc/mosquitto/mosquitto.conf
    simulator: {
      callbackTopic: '<SystemLauncher>/SystemLauncher_CommFunction/replyto',
      triggerTopic: '<ConrodSimulator>/ConrodSimulatorController/execute',
      $meta: 'topics for managing the simulator via http endpoints.',
    },
  },
  elasticsearch: {
    url: 'http://elasticsearch:9200',
    // url: 'localhost:9200',
    removeIndicesAtStartup: false,
    settings: {},
  },
  kibana: {
    url: 'localhost:5601',
  },
};
