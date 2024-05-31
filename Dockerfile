FROM node:20-alpine as base

# update packages
RUN apk update

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
COPY . .

# install dependencies
RUN npm install

# build the application
RUN npm run build

EXPOSE 3000

CMD [ "node", "./dist/server.js" ]
