FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app

RUN npm run build
CMD npm run preview