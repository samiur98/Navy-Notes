FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g react-scripts

RUN npm install -g axios

COPY . .

EXPOSE 3000

CMD ["npm", "start"]