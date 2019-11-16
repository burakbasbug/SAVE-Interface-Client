const MQTT = require('async-mqtt');
const log = require('yalm');
const faker = require('faker');
const config = require('../../../config');

log.setLevel(config.logLevel);
const client = MQTT.connect('mqtt://localhost:8883');

// When passing async functions as event listeners, make sure to have a try catch block
const publish = async data => {
  try {
    await client.publish('example1', JSON.stringify(data));
  } catch (e) {
    log.err(e.stack);
    process.exit();
  }
};

const onConnect = async () => {
  log.info('Connected');
};
client.on('connect', onConnect);

const exampleTypes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
const generateData = () => {
  const random6 = Math.floor(Math.random() * 6) + 1;
  faker.seed(random6);
  return {
    id: `Sensor_${random6}`, // string
    value: Math.random() * 100, // number
    location: {
      lat: (faker.address.latitude() % 10) + 45 + random6, // number
      lon: (faker.address.longitude() % 12) + 5 + random6, // number
    },
    type: exampleTypes[Math.floor(Math.random() * 10)], // keyword
    timestamp: new Date().getTime(), // ISODate
  };
};

setInterval(async () => {
  await publish(generateData());
}, 300);
// island: 65.795278, -22.884514
// m.east 38.071867, 49.933342
