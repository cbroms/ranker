FROM node:latest

COPY client/package.json /client/package.json
COPY client/webpack.config.js /client/webpack.config.js

COPY client/src /client/src
COPY client/static /client/static

WORKDIR /client 

RUN npm install
RUN npm run build

CMD [ "node", "__sapper__/build" ]