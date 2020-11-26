FROM node:11-alpine

RUN apk update
RUN apk upgrade
RUN apk add ca-certificates && update-ca-certificates
RUN apk add --update tzdata
ENV TZ=Europe/Berlin
RUN rm -rf /var/cache/apk/*

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 7000

CMD ["npm", "run", "start"]
