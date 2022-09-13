FROM node:16-alpine
WORKDIR /app/api 
COPY package.json .
RUN npm i
RUN npm i -g nodemon
COPY . .
CMD ["npm", "start"]
