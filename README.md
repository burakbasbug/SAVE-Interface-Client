# SAVE-Interface-Client

Web based user interface to manage and visualize MQTT applications.

## 1. Description

Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## 2. Scripts

- `npm start`: "Starts the application"
- `npm stop`: Stops containers and removes docker containers, docker networks, volumes, and images created by `npm start".
- `npm test`: "Runs static code checks and fixes or prints "
- `npm run checkconfig`: prints the interpreted configuration of the docker-compose file.
- `npm run build:map`: Runs the generator.js to generate a new dataschema for the simulation, which contains elasticsearch type mappings, MQTT topic list and their mappings. New type mappings should be generated if any change in the simulation or MQTT topics was made.
- `npm run build`: Creates a new docker image with the latest version of code.
- `npm run stop:cleanvolume`: "docker-compose down -v",
- `npm run _log`: "docker-compose logs -f save-client; exit 0;",
- `npm run _lint`: "pretty-quick && eslint --fix .",

## 4. Usage

### 1. Building the application

### 2. Running the application with SAVE Simulator

### 3. Running the application with Example MQTT Application

### 4. Changing the dataschema

### 5. Adding new dataschema

1. make sure docker daemon is up and running by e.g. `docker -v`
2. open terminal and run `docker-compose up`

## 5. Simulation Notes

### 5.1 How to adapt the simulation for 1 and 2 machines

- ~set `NUMBER_OF_MACHINES` field in the `config.js`~
- generate new data schema by running `npm run build:map`
- build the docker image with new dataschema by `npm run build`
- simulation is ready for start

### 5.2 How to connect the simulation to the Mosquitto server

- default mosquitto port number is currently `8883`
- to change the default port there are two options: Either set the environment variable `SAVE_MQTT_PORT` or edit the mosquitto port mapping in the `docker-compose.yml` file.

### Presentation

- use https://www.researchgate.net/publication/319243453_Building_an_IoT_Data_Hub_with_Elasticsearch_Logstash_and_Kibana

use:

1. make sure docker daemon is up and running.
2. open terminal and run `docker-compose up`

## ES INDEX PATTERNS

1. `product`
2. `replyto`
3.

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

// bin'deki export.json eski galiba, simulation icindeki yeni. Onu bi kontrol et.
// readme.md bitir.
// commentleri bi yere not almak lazim. ör bear'a at.
