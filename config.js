module.exports = {
  logLevel: 'debug',
  simulation: {
    NUMBER_OF_MACHINES: 2, // example, 1 or any int
  },
  http: {
    host: '0.0.0.0', // 'localhost',
    port: '3000',
    routes: {
      cors: true,
    },
  },
  mqttClient: {
    clientName: 'SAVE-Interface-Client',
    host: 'mosquitto', // 'localhost',
    port: '1883', // config: /usr/local/etc/mosquitto/mosquitto.conf
    simulator: {
      callbackTopic: '<SystemLauncher>/SystemLauncher_CommFunction/replyto',
      triggerTopic: '<ConrodSimulator>/ConrodSimulatorController/execute',
      $meta: 'topics for managing the simulator via http endpoints.',
    },
  },
  elasticsearch: {
    url: 'http://elasticsearch:9200', // 'localhost:9200',
    removeIndicesAtStartup: true,
    settings: {},
  },
};
// [indexpattern] description
