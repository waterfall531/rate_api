FROM node:18.0.0

COPY . /app
WORKDIR /app
RUN npm i
CMD node index.js