const es = require('../commonTypes');

const featureObj = {
  name: es.keywordNoIndex,
  unit: es.keywordNoIndex,
  description: es.keywordNoIndex,
  value: es.float,
};

module.exports = {
  ADDRESS: es.keyword,
  AGENT: es.keyword,
  'VALUE.properties': {
    name: es.keyword,
    machine_state: es.keyword,
    'featuremap.properties': {
      'GAuntenquer.properties': featureObj,
      'GAobenquer.properties': featureObj,
      'Bend.properties': featureObj,
      'GAuntenlngs.properties': featureObj,
      'GAobenlngs.properties': featureObj,
      'KAobenlngs.properties': featureObj,
    },
    usecase_id: es.keywordNoIndex,
    timestamp: es.keywordNoIndex,
    type: es.keywordNoIndex,
  },
  timeStamp: es.date,
};

/*
TODO:
1. örnekleri spec icine yerlestir
2. onlardan en genisini kopyala ve dot formatinda mappings const'una tanimla
3. bunlar henüz prga baglanmadi, bunlar bitince bunlarsiz calistirmayi dene
4. buraya kadar geldiyse bunlari bagla.
 */
