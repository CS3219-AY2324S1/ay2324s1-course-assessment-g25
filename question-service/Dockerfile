FROM node:14-alpine

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

# Expose question service to port 8084.
EXPOSE 8084

# Run the question service.
CMD ["npm", "run", "dev"]