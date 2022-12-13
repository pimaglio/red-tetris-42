FROM node:16-alpine AS development
WORKDIR /node

COPY package*.json ./

ARG NODE_ENV=development

ENV NODE_ENV=${NODE_ENV}
ENV SERVER_PORT=${SERVER_PORT}
ENV CLIENT_PORT=${CLIENT_PORT}

ENV CLIENT_HOST=localhost

RUN npm install

WORKDIR /node/app
CMD ["npm", "run", "start"]
