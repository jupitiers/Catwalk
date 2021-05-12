# This stage installs our modules
FROM node:10.24.0
WORKDIR /app
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# Bundle app source
COPY . .
EXPOSE 8080
CMD ["npm", "start"]