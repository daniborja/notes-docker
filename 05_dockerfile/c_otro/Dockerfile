FROM node:18-alpine3.17


WORKDIR /app

COPY app.js package.json ./

RUN npm i

COPY . .


RUN npm run test


RUN rm -rf tests && rm -rf node_modules
RUN npm ci --only=production


USER node


CMD [ "npm", "start" ]