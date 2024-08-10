FROM node:16.16.0

WORKDIR /code

RUN apt update && apt -y update

COPY package*.json ./
RUN npm install

# CMD [ "sleep", "infinity" ]
CMD [ "sh", "/code/docker/app/init.sh" ]