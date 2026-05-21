FROM node:24

WORKDIR /usr/src/app
COPY package*.json ./

COPY . .

RUN npm ci

CMD [ "node","app.js" ]
