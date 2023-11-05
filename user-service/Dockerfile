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

# Expose user service to port 8080.
EXPOSE 8080

# Run the user service.
CMD ["npm", "run", "dev"]