FROM node:carbon-slim

# Create app directory
WORKDIR /git/tumusica-api

# Install app dependencies
COPY package.json /git/tumusica-api/
RUN npm install
RUN npm install graphql-yoga
RUN npm install apollo-server
RUN npm install apollo-upload-server

# Bundle app source
COPY . /git/tumusica-api/
RUN npm run prepublish

CMD [ "npm", "run", "runServer" ]
