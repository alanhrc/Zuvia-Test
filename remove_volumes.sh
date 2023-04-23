docker compose down
find ./docker/volumes/mssql ! -name '.gitignore' -delete
find ./docker/volumes/nosqldb ! -name '.gitignore' -delete
docker rm $(docker ps -a -q)
# docker rmi $(docker images -a -q)
docker volume prune --force
# docker builder prune --force
