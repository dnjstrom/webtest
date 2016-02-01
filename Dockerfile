FROM node:5.5-slim

RUN mkdir -p /docker
WORKDIR /docker

COPY . /docker

EXPOSE 3000

RUN npm install

CMD ["npm", "run", "forever"]
