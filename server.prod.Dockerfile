FROM node:latest

COPY server/package.json /server/package.json
COPY server/src /server/src

WORKDIR /server 

RUN npm install

CMD [ "npm", "run", "start" ]