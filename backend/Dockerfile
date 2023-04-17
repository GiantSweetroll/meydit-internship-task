FROM node:16.15.1
WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]