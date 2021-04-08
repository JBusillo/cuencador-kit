# FROM alpine:latest
# RUN apk add --update nodejs npm
FROM alpo

WORKDIR /app

COPY ./build .

RUN npm i

EXPOSE 3000

CMD [ "node", "index.js" ]

#docker container exec -t cuencador ls /var
#docker build --compress -t cuencador ./
#docker ps
#docker stop cuencador; docker container rm cuencador; docker image rm cuencador; docker build --compress -t cuencador ./

#docker container create --name cuencador cuencador
#docker cp /var/secrets cuencador:/var/secrets
#docker run -p 80:3000 -p 3306:3306 -d --name cuencador cuencador

