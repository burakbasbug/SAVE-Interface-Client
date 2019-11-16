FROM node:12.13.0-alpine

WORKDIR /SAVE-Interface-Client
COPY . /SAVE-Interface-Client

ENV NODE_ENV=production
# RUN echo Elasticsearch indices will be recreated: $anyEnvVar

RUN npm install --production
RUN ls -al
CMD echo "Waiting for elasticsearch to be ready..." && \
  ./bin/wait-for.sh "elasticsearch:9200" -t 300 -- node saveClientInterface.js
