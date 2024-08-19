# build stage
FROM node:22.6.0 as build

WORKDIR /apps/api-gateway

COPY . .

RUN npm install

RUN npm run build

# production stage
FROM node:22.6.0-alpine3.19

WORKDIR /apps/api-gateway

COPY --from=build /apps/api-gateway/dist ./dist

COPY ./.env ./

COPY package*.json ./

RUN npm install --production

EXPOSE 8020

# start
CMD ["npm", "run", "start"]
