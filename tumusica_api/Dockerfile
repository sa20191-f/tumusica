FROM node:carbon-slim

RUN mkdir -p /home/app

RUN mkdir -p /home/app/temp

# Create app directory
WORKDIR /git/tumusica-api

# Install app dependencies
COPY package.json /git/tumusica-api/
RUN npm install

# Bundle app source
COPY . /git/tumusica-api/
RUN npm run prepublish

EXPOSE 5000

CMD [ "npm", "run", "runServer" ]
