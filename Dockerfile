FROM node:20

WORKDIR /app

COPY package*.json .

RUN npm update && npm install && npm install -g nodemon

COPY . .

CMD nodemon main.js
