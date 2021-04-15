FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN sudo apt update

RUN sudo apt install ffmpeg

COPY . .

CMD [ "node", "index.js" ]