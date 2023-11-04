FROM node:14-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8088

CMD ["npm", "run", "dev"]