module.exports = {
  logLevel: 'debug',
  // dataschema: process.env.SAVE_DATASCHEMA || 'simulation_n',
  simulation: {
    NUMBER_OF_MACHINES: process.env.SAVE_NUMBER_OF_MACHINES || 2,
  },
  http: {
    host: process.env.SAVE_HTTP_HOST || '0.0.0.0', // 'localhost',
    port: process.env.SAVE_HTTP_PORT || '3000',
    routes: {
      cors: true,
    },
  },
  mqtt: {
    clientName: 'SAVE-Interface-Client',
    host: process.env.SAVE_MQTT_HOST || 'mosquitto', // 'localhost',
    port: process.env.SAVE_MQTT_PORT || '1883', // config: /usr/local/etc/mosquitto/mosquitto.conf
    simulator: {
      callbackTopic: '<SystemLauncher>/SystemLauncher_CommFunction/replyto',
      triggerTopic: '<ConrodSimulator>/ConrodSimulatorController/execute',
      $meta: 'topics for managing the simulator via http endpoints.',
    },
  },
  elasticsearch: {
    url: process.env.ES_URL || 'http://elasticsearch:9200', // 'localhost:9200',
    removeIndicesAtStartup: true,
    settings: {},
  },
};
