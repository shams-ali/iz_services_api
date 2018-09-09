FROM node:10.10.0-alpine

RUN apk update && apk upgrade && apk add --no-cache \
    --repository http://dl-3.alpinelinux.org/alpine/edge/testing \
    alpine-sdk \
    vips-dev \
    fftw-dev \
    python \
    pdftk \
    ocaml \
    libelf-dev

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 3030
EXPOSE 80
EXPOSE 443

CMD ["npm", "run", "start:prod"]
