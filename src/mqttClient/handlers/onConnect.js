const log = require('yalm');
const _ = require('lodash');
const config = require('../../../config');
const { topicIndexMap } = require('../../dataschema');

let conn;

const subscribeMetricTopics = () => {
  log.info('subscribing mqtt metric topics');
  const topics = _.map(topicIndexMap, 'topic');
  _.each(topics, topic => {
    conn.subscribe(topic, err => {
      if (err) {
        log.error(err);
      }
      log.debug('subscribeMetricTopics', `subscribed to '${topic}'`);
    });
  });
};

const subscribeCallbackTopic = () => {
  const CALLBACK_TOPIC = config.simulation.callbackTopic;
  conn.subscribe(CALLBACK_TOPIC, err => {
    if (err) {
      log.error(err);
    }
    log.debug(`subscribed to '${CALLBACK_TOPIC}'`);
  });
};

module.exports = mqttConnection => {
  conn = mqttConnection;
  // promise'ler ile sirasi kesinlestirilecek.
  subscribeMetricTopics();
  subscribeCallbackTopic();
};
