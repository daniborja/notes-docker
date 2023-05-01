# entity.name.image.stage.dockerfile source.dockerfile
FROM node:18-alpine3.17 as deps
WORKDIR /app
COPY package.json ./
RUN npm i
COPY . .



FROM node:18-alpine3.17 as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# testing
RUN npm run test
# RUN npm run build



FROM node:18-alpine3.17 as prod-deps
WORKDIR /app
COPY package.json .
# RUN npm ci --only=production    <--   packagelock.json
RUN npm i --prod
# RUN npm i --omit=dev



FROM node:18-alpine3.17 as runner
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
# COPY . .
COPY app.js ./
COPY tasks/ ./tasks
CMD [ "npm", "start" ]
