FROM node:16-alpine

WORKDIR /usr/src/

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production

COPY . .

EXPOSE 3000
CMD ["node", "./src/index.js"]
