FROM node:17-alpine

WORKDIR /app

# Copy package.json files into the container.
COPY package.json .

# Copy .next files into the container.
COPY .next /app/.next

# Install dependencies.
RUN npm install

# CI mode
RUN npm ci

# Copy the rest of the source code into the container.
COPY . .

# Expose front end port 3000.
EXPOSE 3000

# Run the front end.
CMD ["npm", "run", "dev"]

