FROM node:lts-alpine AS application-builder

WORKDIR                    /usr/src/app

COPY package*.json         ./

RUN npm install --silent

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

COPY . ./

RUN npm run build


FROM node:lts-alpine AS server-builder

WORKDIR /opt/server

COPY --from=application-builder /usr/src/app/package*.json ./

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
RUN npm install --silent \
 && npm prune --production \
 && npm cache clean --force

COPY --from=application-builder /usr/src/app/dist          ./dist

ARG PORT=3000
ENV PORT=$PORT

EXPOSE ${PORT}
CMD [ "node", "dist/index.js" ]
