FROM node:5.5-slim

RUN mkdir -p /src
WORKDIR /src

EXPOSE 3000

CMD ["npm", "start"]
