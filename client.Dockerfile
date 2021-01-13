FROM node:latest

COPY client/package.json /client/package.json

WORKDIR /client 

RUN npm install

CMD [ "npm", "run", "dev" ]