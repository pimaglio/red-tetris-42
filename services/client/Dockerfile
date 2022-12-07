
# ---------------------------------------
# Development stage
# ---------------------------------------
FROM node:16 AS development

WORKDIR /node
# Install Node without having the whole application files (cache)
COPY package.json ./

# Default build argument is dev
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
ARG CLIENT_PORT
ENV CLIENT_PORT=${CLIENT_PORT}
ARG SERVER_PORT
ENV VITE_SERVER_PORT=${SERVER_PORT}
ARG CLIENT_HOST
ENV VITE_HOST=${CLIENT_HOST}


RUN npm install

# Change the workdir to a deeper level to avoid node_modules issues
COPY vite.config.js .

WORKDIR /node/app

# We do not build the application in development mode, we will use docker-compose volume
# to mount the dev machine to the container. It will allows the development to change the
# code without restarting the container.

EXPOSE 3000

CMD ["npm", "run", "start"]
