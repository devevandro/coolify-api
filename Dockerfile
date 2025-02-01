FROM node:20-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn install --frozen-lockfile && yarn cache clean

RUN yarn build

USER node

EXPOSE 3030

CMD [ "yarn", "start" ]