FROM node:16-alpine

WORKDIR /usr/src/

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production

COPY . .

CMD ["node", "./src/index.js"]
