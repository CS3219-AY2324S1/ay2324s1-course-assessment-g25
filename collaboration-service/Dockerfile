FROM node:17-alpine

WORKDIR /app

# Copy package.json files into the container.
COPY package*.json ./

COPY .next /app/.next

# Install dependencies.
RUN npm install

# CI mode
RUN npm ci

# Copy the rest of the source code into the container.
COPY . .

# Liveblocks uses port 3000 for the front end.
# But local host will use port 3001 for collaboration service.
EXPOSE 3000

# Run the front end.
CMD ["npm", "run", "dev"]