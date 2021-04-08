#!/bin/bash

docker stop cuencador;
docker container rm cuencador;
docker image rm cuencador;
docker build --compress -t cuencador ./
docker container create -p 80:3000 -p 3306:3306 --name cuencador cuencador
docker cp /var/secrets cuencador:/var/secrets
docker start cuencador

#run -p 80:3000 -p 3306:3306 -d
