FROM node:8.11-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN yarn install
COPY . .
EXPOSE 3333
CMD yarn run start
