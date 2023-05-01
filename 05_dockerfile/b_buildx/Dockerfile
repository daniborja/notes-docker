# ## buildx: el buildx envia esa EnvV  <-- debe estar el `buildx use en 'mybuilder0'`
# FROM --platform=$BUILDPLATFORM node:18-alpine3.17
FROM node:18-alpine3.17


# cd app
WORKDIR /app

### COPY . .    <-   ./  hace ref al WORKDRI
COPY app.js package.json ./

# execute any commands in a NEW LAYER 
RUN npm i

COPY . .


# testing
RUN npm run test


#### Optimizacion para Node - Empirico (NO pro como Stages)
# delete cosas innecesarias en PROD
RUN rm -rf tests && rm -rf node_modules
# install solo deps de prod
RUN npm install --prod




# comando q se ejecuta al hacer el  RUN img
CMD [ "npm", "start" ]



# ### best practives to build a container of node: https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/
# npm ci
# pnpm install --frozen-lockfile
