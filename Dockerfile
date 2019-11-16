FROM node:8.16.2-alpine

WORKDIR /SAVE-Interface-Client
COPY . /SAVE-Interface-Client

EXPOSE 3000
EXPOSE 8883

ENV NODE_ENV=production
# RUN echo Elasticsearch indices will be recreated: $anyEnvVar

RUN npm install --production
RUN ls -al
CMD echo "Waiting for elasticsearch to be ready..." && \
  ./bin/wait-for.sh "elasticsearch:9200" -t 300 -- node saveClientInterface.js
