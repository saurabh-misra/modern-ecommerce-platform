# Uses Node v20 LTS running on Alpine Linux
FROM node:20-alpine

# Sets working directory within the image
WORKDIR /usr/src/app

# Copy package and dependency config( Layer caching )
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code and TS config
COPY tsconfig.json ./
COPY ./src ./src

# Build the application
RUN npm run build

# Document the port that the container will expose when run
EXPOSE 3000

# The command that will start the server
CMD [ "node", "dist/server.js" ]