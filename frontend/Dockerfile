FROM node:17-alpine

WORKDIR /app

# Copy package.json files into the container.
COPY package*.json ./

COPY .next /app/.next

# Install dependencies.
RUN npm install

# CI mode.
RUN npm ci

# Copy the rest of the source code into the container.
COPY . .

# # Generate Prisma client code
RUN npx prisma generate

# # kill all processes running on port 3000 since frontend need to use prot 3000.
# RUN npx kill-port 3000

# Expose front end port 3000.
EXPOSE 3000

# Run the front end.
CMD ["npm", "run", "dev"]

