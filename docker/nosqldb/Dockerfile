FROM mongo:5.0.3

ARG DK_UID
ARG DK_GID
ARG NOSQLDB_INITDB_DATABASES

RUN usermod -u ${DK_UID:-1000} mongodb
RUN groupmod -g ${DK_GID:-1000} mongodb

RUN echo "const  databases = '${NOSQLDB_INITDB_DATABASES}'; \
  const dbs = databases.split(';'); \
  for (const i in dbs) { \
  if (Object.hasOwnProperty.call(dbs, i)) { \
  const db_name = dbs[i]; \
  db = new Mongo().getDB(db_name); \
  db.createCollection('dummy'); \
  } \
  }"  >>  "/docker-entrypoint-initdb.d/mongo-init.js"

CMD ["mongod", "--bind_ip_all"]
