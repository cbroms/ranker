FROM node:latest

COPY server/package.json /server/package.json

WORKDIR /server 

RUN npm install

CMD [ "npm", "run", "dev" ]