FROM node:alpine

WORKDIR /

COPY ./package*.json ./


COPY ./dist ./dist
COPY ./public ./public

RUN npm install -g sirv sirv-cli

EXPOSE 5000

ENV HOST=0.0.0.0

CMD [ "npm", "run", "start" ]