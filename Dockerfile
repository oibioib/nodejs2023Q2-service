FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci
RUN npm cache clean --force

COPY . .

CMD [ "npm", "run", "start:dev" ]
