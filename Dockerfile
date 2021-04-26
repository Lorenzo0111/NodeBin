FROM node:14
WORKDIR /backend
COPY package*.json ./
RUN npm install
COPY . .
# Backend port
EXPOSE 3030

CMD [ "node", "app.js" ]

WORKDIR /frontend
COPY package*.json ./
RUN yarn install
RUN yarn build
EXPOSE 5000

CMD [ "npm", "install", "-g", "serve" ]
CMD [ "serve", "-s", "build"]