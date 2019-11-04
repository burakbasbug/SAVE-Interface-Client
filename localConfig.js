module.exports = {
  logLevel: 'debug',
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
/*
0. Tüm volume'lari sildim
1. docker-compose up yapinca 4 tane (unnamed) volume yaratildi.
2. docker-compose down sonucunda bular SILINMEDI
3. Yeni bir docker-compose up yapinca bu sefer 4 yerine 2 yeni volume yaratildi
4. yeni yaratilanlar muhtelemen node-app ve mosquitto'ya aittir cünkü ES ve Kibana
verileri bi sekilde persist ediliyor.
5. bundan sonraki her docker-compose down + docker-compose up yaptigimda extradan 2 yeni volume
yaratiliyor. Yani 2 volume hep kullanimda, 2 volume ise hep yeniden yaratiliyor.
6. docker-compose down -v yapinca ise 2 volume siliyor, 2si kaliyor.
7. muhtemelen bu persist olan 2 volume es ve kibanaya aittir.
8. sürekli yeni olarak yaratilan volume'lari Compose down yapinca silmek icin: `docker-compose down -v`
  8.1 "-v" : Remove named volumes declared in the volumes section of the Compose file and anonymous volumes attached to containers.
 */
