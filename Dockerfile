FROM node

RUN apt-get update && apt-get -y install build-essential gcj-jdk unzip wget
RUN wget http://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/pdftk-2.02-src.zip && unzip pdftk-2.02-src.zip
RUN sed -i 's/VERSUFF=-4.6/VERSUFF=-4.8/g' pdftk-2.02-dist/pdftk/Makefile.Debian
RUN cd pdftk-2.02-dist/pdftk && make -f Makefile.Debian && make -f Makefile.Debian install
RUN rm -rf pdftk-2.02-dist pdftk-2.02-src.zip && apt-get clean
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
