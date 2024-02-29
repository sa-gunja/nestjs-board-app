FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ENV PORT=3000

CMD [ "npm", "run", "start:prod"]

