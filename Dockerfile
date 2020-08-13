FROM node:12.18
WORKDIR /usr/src/shared/infra/server
COPY ["package.json", "package-lock.json*", "./"]
RUN yarn install
COPY . .
EXPOSE 3333
CMD ["yarn", "dev:server"]
