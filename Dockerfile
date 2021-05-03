FROM node:lts-buster-slim
WORKDIR /app

COPY ./*.json ./webpack.config.js .babelrc ./
COPY ./src ./src
RUN npm i
EXPOSE 8081

CMD ["npm", "run", "dev"]