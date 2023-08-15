FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci
RUN npm cache clean --force

COPY . .

RUN npm i -g typescript

CMD [ "npm", "run", "start:app" ]

