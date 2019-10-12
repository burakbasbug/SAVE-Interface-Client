const onConnectHandler = require('./onConnect');
const onMessageHandler = require('./onMessage');
const onErrorHandler = require('./onError');
const onCloseHandler = require('./onClose');

module.exports = {
  onConnectHandler,
  onMessageHandler,
  onErrorHandler,
  onCloseHandler,
};
