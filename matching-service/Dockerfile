FROM node:18-alpine

RUN npm install -g nodemon

WORKDIR /app

# Copy package.json files into the container.
COPY package*.json ./

# Copy the rest of the source code into the container.
COPY . .

# Install dependencies.
RUN npm install

# CI mode
RUN npm ci

# Expose matching service to port 8088.
EXPOSE 8081

# Matching service use npm start to start the service
CMD ["npm", "start"]