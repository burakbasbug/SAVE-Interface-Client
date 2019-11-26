# SAVE-Interface-Client

Web based user interface to manage and visualize MQTT applications.

## Start Guide

1. Install the requirements: [Docker](https://docs.docker.com/install/), [Node.js & npm](https://nodejs.org/)
2. Install node modules: `npm i`
3. Build docker images: `npm run build:app`
4. Start the app: `docker-compose up`
   1. Once started, import dashboards & visualizations into Kibana under [Saved Objects Section](http://localhost:5601/app/kibana#/management/kibana/objects) the `export.json` from related dataschema. [Docs](https://www.elastic.co/guide/en/kibana/6.8/managing-saved-objects.html)
   2. If necessary, set any index pattern as default under [Index Patterns Section](http://localhost:5601/app/kibana#/management/kibana/index). [Docs](https://www.elastic.co/guide/en/kibana/6.8/index-patterns.html#set-default-pattern)
5. Start the source to work on `mqtt://localhost:8883` (for example the Simulation).
6. Open [Dashboards Tab](http://localhost:5601/app/kibana#/dashboards) or see individual visualization on [Visualizations Tab](http://localhost:5601/app/kibana#/visualize).
7. Stop and remove containers : `docker-compose down`

## Application Structure

The application files are categorized by role. The roles in the application are:

1. browser
2. server
   2.1 HTTP Server
   2.2 MQTT Client
   2.3 Data Schema

```
.
├── bin/                                                    # folder for binary executables
│   └── wait-for.sh                                         # script to run this app after Elasticsearch container
├── browser/
│   ├── assets
│   └── panel.html                                          # Web interface to manage SAVE Simulation
├── Dockerfile                                              # docker image definition of the SAVE-Interface-Client
├── config.js                                               # 'internal' configurations are exported by this javascript module
├── docker-compose.yml                                      # architecture and other services
├── package.json                                            # required node modules & application scripts
├── saveClientInterface.js                                  # entry point of the application
└── src/
    ├── dataschema/                                         # contains data schemas of the application in seperate folders
    │   ├── index.js                                        # to bind a data schema to the app, it must be added here
    │   │
    │   ├── example1/                                       # the data schema 'example'
    │   │   ├── elasticsearchIndices.json                   # the list of [index name] + [type definition of the index]
    │   │   ├── example export.json                         # visualizations, dashboards & index patterns
    │   │   ├── runFakeSimulation.js                        # simple application to produce
    │   │   └── topicIndexMap.json                          # mapping: [MQTT Topic] <-> [Elasticsearch index names]
    │   │
    │   └── simulation_n                                    # the data schema 'simulation with n machines'
    │       ├── elasticsearchIndices/                       # elasticsearchIndices as module for better structure
    │       │   ├── NEW_STATE_INFORMATION.js                # elasticsearch index type definition
    │       │   ├── PERFORM_ACTION.js                       # elasticsearch index type definition
    │       │   ├── PRODUCTS.js                             # elasticsearch index type definition
    │       │   ├── REPLYTO.js                              # elasticsearch index type definition
    │       │   ├── REQUESTS.js                             # elasticsearch index type definition
    │       │   ├── commonTypes.js                          # enumeration of common elasticsearch types used among other elasticsearch type definitions
    │       │   ├── index.js                                # export point of the the module 'elasticsearchIndices'
    │       │   └── messageExamplesForEachTopic             # A non-functional collection of MQTT messages from relevant topics
    │       ├── kibana/
    │       │   └── export.json                             # visualizations, dashboards & index patterns for Simulation
    │       ├── topicIndexMap/                              # MQTT Topic <-> Elasticsearch Index Mapping of the Simulation (see Simulation Chapter)
    │       │   ├── index.js                                # export point of the module 'topicIndexMap'
    │       │   └── index.spec.js                           # static type check for the module
    │       ├── topicIndexMap_GENERATED.json                # final mapping generated from topicIndexMap module
    │       ├── dataschema_GENERATED.csv                    # topicIndexMap as CSV for documentation purposes
    │       ├── elasticsearchIndices_GENERATED.json         # final mapping generated from elasticsearchIndices module
    │       └── generator.js                                # generator script for all "GENERATED_" suffixed files
    ├── mqttClient                                          # MQTT Client to listen and process related simulation topics
    │   ├── handlers
    │   │   ├── index.js
    │   │   ├── onClose.js
    │   │   ├── onConnect.js
    │   │   ├── onError.js
    │   │   └── onMessage
    │   │       └── index.js
    │   └── index.js
    └── server                                              # Server units to bind MQTT & HTTP targets
        ├── elasticsearchClient.js                          # methods to call for elasticsearch
        ├── handlers.js
        ├── index.js
        ├── routes.js                                       # List of HTTP Server routes
        └── simulatorService.js                             # Simulator state management service

```

## Scripts

- `npm start`: "Starts the application"
- `npm stop`: Stops containers and removes docker containers, docker networks, volumes, and images created by `npm start".
- `npm test`: "Runs static code checks and fixes or prints "
- `npm run checkconfig`: prints the interpreted configuration of the docker-compose file.
- `npm run build:map`: Runs the generator.js to generate a new dataschema for the simulation, which contains elasticsearch type mappings, MQTT topic list and their mappings. New type mappings should be generated if any change in the simulation or MQTT topics was made.
- `npm run build`: Creates a new docker image with the latest version of code.
- `npm run stop:cleanvolume`: "docker-compose down -v",
- `npm run _log`: "docker-compose logs -f save-client; exit 0;",
- `npm run _lint`: "pretty-quick && eslint --fix .",

## Project SAVE

### MQTT Topic <-> Elasticsearch Index Mapping of the Simulation

```
|                MQTT Topic Path                      | Index Name                  |
|-----------------------------------------------------------------------------------|
| "<ConrodSimulator>/OP_1/machinecommands"            |   "perform_action"          |
| "<ConrodSimulator>/conveyorbelt/position1"          |   "intermediate_products"   |
| "<ConrodSimulator>/conveyorbelt/position2"          |   "intermediate_products"   |
| "<ConrodSimulator>/conveyorbelt/position3"          |   "final_products"          |
| "<aco001_adam>/adam/costEstimateLocalCodeService"   |   "requests"                |
| "<aco001_adam>/adam/replyto"                        |   "replyto"                 |
| "<aco001_adam>/adam/resetLocalCodeService"          |   "requests"                |
| "<aco001_adam>/adam/resetOtherCodeService"          |   "requests"                |
| "<aco001_code>/code/processdata"                    |   "new_state_information"   |
| "<aco001_code>/code/replyto"                        |   "replyto"                 |
| "<aco001_sake>/sake/replyto"                        |   "replyto"                 |
| "<aco002_adam>/adam/costEstimateLocalCodeService"   |   "requests"                |
| "<aco002_adam>/adam/replyto"                        |   "replyto"                 |
| "<aco002_adam>/adam/resetLocalCodeService"          |   "requests"                |
| "<aco002_adam>/adam/resetOtherCodeService"          |   "requests"                |
| "<aco002_code>/code/processdata"                    |   "new_state_information"   |
| "<aco002_code>/code/replyto"                        |   "replyto"                 |
| "<aco002_sake>/sake/replyto"                        |   "replyto"                 |
-------------------------------------------------------------------------------------
```

### How to adapt for the number of machines in the simulation

1. npm ve node kurulu olmali
2. npm scriptini ver: generate new data schema by running `npm run build:map`
3. build the docker image with new dataschema by `npm run build:app`
4. simulation is ready for start

### How to connect the simulation to the Mosquitto server

- default mosquitto port number is currently `8883`
- to change the default port there are two options: Either set the environment variable `SAVE_MQTT_PORT` or edit the mosquitto port mapping in the `docker-compose.yml` file.

## Su anda:

- sadece docker-compose up yapip calistiriyorum
- ES INDEXLERi MESAJ GELDIGINDE YARATILIYOR
- Kibana dashboard'u import edilerek yükleniyor ama:
  - index pattern'lerin dogru yüklenmesi lazim =
    - ben dashboard'lari yarattigimdaki indexler ne durumdaysa ayni öyle olmali.
    - Mesela indexlerin shard/replica sayisi falan dogru ayarlanmis olmali. Yani:
      1. önce elasticsearch kurulumu tamamlanacak (ki benim acona_client indexleri yaratirken shard/replica ayarlarini uygulayabilsin)
      2. benim uygulama baslayacak
      - Bu sirayi saglamak icin simdilik sleep 120 koydum ama onun yerine 5 saniyede bi ES'e request atip 200 beklesin.
      3. kibana baslayacak
      4. kibanaya ayarlar import edilecek
      5. aco\* default index pattern olarak secilecek.
      6. _Dashboard acildiginda mutlaka gösterilen zaman araligini genis secmek gerek! ör. **last 4 hrs**_
- Acona_client'in initial ES baglantisi (index yaratan) olmassa program ya cikmali yada ES'in kurulmasini orda beklemeli
- ES'in cok fazla gereksiz ciktisi var, tamamen kisilmali. Kibana'nin da baya gereksiz, belki önemli seyleri secme varsa öyle olmali, yoksa tamamen kisilmali.

## important note

- config.js ve dataschema'da degisiklik olursa rebuild'e gerek yok, restart yeterli. dataschema klasoru ve config.js direk container icine aliniyor.
- simulation connects to mosquitto on 8883 by default,
  - bunu karistirma: can be changed ONLY AT build time `SAVE_MQTT_PORT=1883 npm run build`
- yeni dataschema ekleme nasil oluyor.
- Dataschema ve config.js

# TODO

1. Bu README.md'yi toparla
   1. script'leri tezdekiler gibi `docker-copmose up` öncelikli yaz.
   2.
2. Tüm bu dosyanin bir kopyasini al: Bi Kopyasi lokalde benim, bi kopyasi ise tüm gecmis commitler silinmis halde githubda.
3. Github kopyasindan tüm commentleri sil yada ing tekrar yaz.
4. Bitmis versiyonu localde test et, belki Kibana Dashboard'u biraz düzenle?
5. Bitmis versiyonu windowsda test et: Kendi panelimle olan versiyonu!!
