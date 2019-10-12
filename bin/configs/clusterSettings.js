// GET localhost:9200/_cluster/settings
// PUT localhost:9200/_cluster/settings

module.exports = {
  persistent: {
    action: {
      auto_create_index: 'true',
    },
    cluster: {
      routing: {
        allocation: {
          disk: {
            threshold_enabled: 'false',
          },
        },
      },
    },
    xpack: {
      monitoring: {
        collection: {
          enabled: 'false',
        },
      },
    },
  },
  transient: {},
};
