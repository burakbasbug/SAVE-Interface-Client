# SAVE-Interface-Client

Nodejs application to manage mqtt clients over http.

## Usage

```bash
npm run build:map
npm run build
npm start
npm run log
# start the simulation
...
npm stop
```

1. `npm run start:ek` in seperate tab
1. starts elasticsearch & kibana from bin/elasticsearch & bin/kibana
1. write pid of elasticsearch to bin/pid file
1. `node saveClientInterface.js` (starts the application)
1. start the simulation
1. if es has no data, let application register some data to the es indices.
1. open kibana on http://localhost:5601
1. import kibana settings and dashboards from bin/kibana_export.json
1. kibana > management (from panel) > saved objects > import (right top)
1. stop kibana with `ctrl+c`
1. stop elasticsear with `npm run stop:es`
1. stop nodejs application with `ctrl+c`

### Presentation

- use https://www.researchgate.net/publication/319243453_Building_an_IoT_Data_Hub_with_Elasticsearch_Logstash_and_Kibana

use:

1. make sure docker daemon is up and running.
2. open terminal and run `docker-compose up`

## ES INDEX PATTERNS

1. `product*`
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

## Todo

- windowsda calistirilcak
  - sadece docker ve java 12 lazim

* `topicIndexNameMapping.js` yerine `config_es_topics.json`
* mappingler yapilacak: **önce bi topicten message oku, sonra aynen yapistir.**
  - her type icin ayri dosya yap ?
  - no index ayari mümkün oldugunca bol
  - icteki timestamp'in olmamasi sikinti olur mu?
    - galiba tüm doclarda distaki timestampi okucam
  - tüm mappingler yarim gün sürse, dashboard olusturmaya vakit kaliyor.
* Elasticsearch (gereksiz olabilir)
  - her index creationda uygulanan settingleri REST'ten vermek yerine, docker'dan elasticsearch.yml olarak okut.
  - Cünküüüü `DE_es ile LOL visualization yapmis` pdf'indeki gibi bi hata gelirse setting gereksiz büyüyecek.
  - Bunu yaparsan bachelorarbeitta da caption 4.4'e yeni SS yada kod atmak gerek.
* iframe eklenecek
* daha basit ve statik bir type mapping (string template yada handlebars falan)
* es settinglerini post ile göndermek yerine yaml'a yazmaya gerek var mi?
* https://elastic.github.io/eui/#/

## important note

- Explain that types are skipped and there are no types during index creation.
  - https://www.elastic.co/guide/en/elasticsearch/reference/6.8/indices-create-index.html#_skipping_types
- Yeni bir topic eklemek icin ne yapmak gerek.

  - varsa elasticsearch mappingType'ini yaratmak gerek
  - `topicIndexNameMapping` modülünde herhangi bir yere `{ topic: topicPath, mappingType: ... }` seklinde eklemek gerek.

- config.js ve dataschema'da degisiklik olursa rebuild'e gerek yok, restart yeterli. dataschema klasoru ve config.js direk container icine aliniyor.
