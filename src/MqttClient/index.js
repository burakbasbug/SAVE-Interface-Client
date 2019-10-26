const mqtt = require('mqtt');
// const log = require('yalm');
const config = require('../../localConfig');
const {
  onConnectHandler,
  onMessageHandler,
  onErrorHandler,
  onCloseHandler,
} = require('./handlers');

let conn;

function getConnection() {
  function init() {
    const { brokerUrl } = config.mqtt;
    const mqttOpts = {
      will: {
        topic: `${config.mqtt.clientName}/connected`,
        payload: '0',
        retain: true,
      },
      name: `${config.mqtt.clientName}_${1}`,
    };
    conn = mqtt.connect(brokerUrl, mqttOpts);
    // connInstance.on('reconnect', onConnectHandler);
    conn.on('connect', onConnectHandler.bind(null, conn));
    conn.on('error', err => onErrorHandler(err));
    conn.on('message', (topic, message) => onMessageHandler(topic, message));
    conn.on('close', onCloseHandler);
    return conn;
  }
  return conn || init();
}

function clientConnected() {
  return conn ? conn.connected : false;
}

module.exports = {
  getConnection,
  clientConnected,
};
