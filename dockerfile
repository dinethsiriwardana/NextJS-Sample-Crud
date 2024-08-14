# Mongo db
FROM mongo:4.4.6

WORKDIR /usr/src/app

VOLUME /data/db

EXPOSE 27017
