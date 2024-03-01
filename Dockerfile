FROM node:20

WORKDIR /app

COPY package*.json .

RUN npm update && npm install

COPY . .

CMD node main.js
