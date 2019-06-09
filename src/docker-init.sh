# script to automatically setup the docker environment for this project.
# You're assumed to have Docker Engine release 18.06.0+
cp .env.docker .env -f
docker-compose down
docker-compose up -d
