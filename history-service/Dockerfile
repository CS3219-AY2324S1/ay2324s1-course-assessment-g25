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

# kill all processes running on port 8000 since history service need to use prot 8000.
RUN npx kill-port 8000

# Expose history service to port 8000.
EXPOSE 8000

# Run the history service.
CMD ["npm", "run", "start"]