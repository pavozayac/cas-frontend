FROM node:alpine

WORKDIR /

COPY ./package*.json ./

RUN npm install -g sirv sirv-cli

COPY ./dist ./dist
COPY ./public ./public

ENV HOST=0.0.0.0