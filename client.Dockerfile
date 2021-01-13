FROM node:latest

COPY client/package.json /client/package.json
COPY client/webpack.config.js /client/webpack.config.js

WORKDIR /client 

RUN npm install

CMD [ "npm", "run", "dev" ]