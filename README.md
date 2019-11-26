# SAVE-Interface-Client

Web based user interface to manage and visualize MQTT applications.

## Start Guide

> Before starting, [Docker](https://docs.docker.com/install/) must be installed and running.

The application can be started the with the steps listed below. The scripts are context sensitive and should be executed in the projects root directory.

1. `cd path/to/the/project`
2. Build the docker images: `docker-compose build --parallel`
3. Start the app: `docker-compose up`
4. Start Project SAVE Simulation (or any target MQTT source) to connect the Mosquitto broker on `mqtt://localhost:8883`.
5. Start the simulation. Simulation cycles can be triggered with provided web panel under `browser/panel.html`.
6. Initialize Kibana:
   1. Load dashboards and visualizations by importing `export.json` from related dataschema into Kibana under [Saved Objects Section](http://localhost:5601/app/kibana#/management/kibana/objects).
   2. Choose **any** index pattern as default under [Index Patterns Section](http://localhost:5601/app/kibana#/management/kibana/index) by selecting and marking it with star.
   3. Open [Dashboards Tab](http://localhost:5601/app/kibana#/dashboards) or see the visualization collection on [Visualizations Tab](http://localhost:5601/app/kibana#/visualize).
7. Stop and remove containers : `docker-compose down`

### Related Kibana Guides:

- [Dashboard](https://www.elastic.co/guide/en/kibana/6.8/dashboard.html)
- [Saved Objects](https://www.elastic.co/guide/en/kibana/6.8/managing-saved-objects.html)
- [Index Patterns](https://www.elastic.co/guide/en/kibana/6.8/index-patterns.html)
- [Default Index Pattern](https://www.elastic.co/guide/en/kibana/6.8/index-patterns.html#set-default-pattern)

## Application Structure

The application files are categorized by role. The roles in the application are:

1. browser: The web interface (panel.html) for managing the simulation.
2. server:
   1. HTTP Server: For handling the requests from web interface and to connect the simulation to the Elasticsearch
   2. MQTT Client: For listening the MQTT communication
   3. Data Schema: For defining the data types and storing the visualizations.

```
.
├── bin/                                                    # folder for binary executables
│   └── wait-for.sh                                         # script to run this app after Elasticsearch container
├── browser/
│   ├── assets
│   └── panel.html                                          # Web interface to manage SAVE Simulation
├── Dockerfile                                              # docker image definition of the SAVE-Interface-Client
├── config.js                                               # 'internal' configurations are exported by this javascript module. Alternative config values are also added as comments.
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

> Install [Docker](https://docs.docker.com/install/) and [Node.js & npm](https://nodejs.org/)

- `docker-compose up`: starts the application
  - optionally: `docker-compose up -d` to start the application as daemon.
- `docker-compose down`: stops containers and removes docker containers, docker networks, volumes, and images created by `npm start".
- `npm run build:map`: runs the generator.js to generate a new dataschema for the simulation, which contains elasticsearch type mappings, MQTT topic list and their mappings. New type mappings should be generated if any change in the simulation or MQTT topics was made.
- `npm run build:app`: Script to build the docker image of the application. Script runs static code check and creates a new docker image with the latest version of code.
  - alternatively: `docker-compose build --parallel` only for building the docker image.
- `npm test`: runs static code checks and formats the code as defined in the `.prettierrc`.
- `npm run checkconfig`: prints the interpreted configuration of the docker-compose file.
- `npm run _lint`: shortcut script for code linting, formatting and static checks.

## Project SAVE Notes

### MQTT Topic <-> Elasticsearch Index Mapping

The table below presents the existing mapping of MQTT Topics and Elasticsearch indices. This structure is defined in the `topicIndexMap` module and
auto-generated at each `npm run build:app <NUMBER>` command. Each index under the "Index Name" must be declared by elasticsearchIndices.js module.
For a better readability, each elasticsearch type is defined in seperate file under `src/dataschema/simulation_n/elasticsearchIndices/` folder. The folder
also contains example MQTT messages, which are JSON format. Anychange in the `simulation_n` requires to call the `build:map` script.

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

### How to change the number of machines in the simulation

> Nodejs 8 or a later version and npm (node package manager) must be already installed.

1. Generate the dataschema with desired number of machines: `npm run build:map <NUMBER>`
2. Build the docker image with new dataschema: `npm run build:app`
3. Simulation is ready for start

### How to connect the Project SAVE simulation to the application on a different port number

The default mosquitto port number is `8883`, which is defined by `SAVE_MOSQUITTO_PORT:-8883` in the `docker-compose.yml`.
Optionally the environment variable can be used to override this default setting: `SAVE_MOSQUITTO_PORT=8883`
