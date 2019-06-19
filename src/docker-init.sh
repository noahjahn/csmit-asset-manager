# Script to automatically setup the docker environment for this project.
# You're assumed to have Docker Engine release 18.06.0+
docker-compose down # stop any currently running containers
docker rm $(docker ps -aq) -f # remove all containers
# docker-compose build # build if there are any changes
cp -f .env.docker .env # setup local environment file
rm -rf application/vendor/* # remove vendors folder so the dependencies are installed each time
docker system prune -f
docker volume prune -f
docker-compose up -d # start the docker containers and connect using the docker-compose.yml
