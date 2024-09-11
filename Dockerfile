FROM node:20

WORKDIR /app

COPY package*.json .

RUN npm update && npm install && npm install -g nodemon && npm install canvas

COPY . .

CMD nodemon main
