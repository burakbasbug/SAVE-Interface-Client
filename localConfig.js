module.exports = {
  logLevel: 'debug',
  http: {
    host: 'localhost',
    port: '3000',
  },
  mqtt: {
    clientName: 'SAVE-Interface-Client',
    brokerUrl: 'mqtt://mosquitto:1883',
    // brokerUrl: 'mqtt://localhost:1883',
    simulator: {
      callbackTopic: 'returnTo',
      triggerTopic: 'startSimulation',
      $meta: 'topics for managing the simulator via http endpoints.',
    },
  },
  elasticsearch: {
    url: 'http://elasticsearch:9200',
    // url: 'localhost:9200',
    removeIndicesAtStartup: true,
    settings: {},
  },
  kibana: {
    url: 'localhost:5601',
  },
};
