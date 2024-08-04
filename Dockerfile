# Base image for building the application
FROM node:18.17-bullseye-slim as base

# Set the working directory
WORKDIR /home/node/app

# Install necessary global tools
RUN npm install -g cross-env nodemon

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install all dependencies, including development dependencies
RUN npm install

# Copy the application source code
COPY . .

# Builder stage for building the application
FROM base as builder

# Set the working directory
WORKDIR /home/node/app

# Build the application using the remix and vite build scripts
RUN npm run build

# Runtime stage for running the application
FROM node:18.17-bullseye-slim as runtime

# Set environment variables for production
ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=build/payload.config.js

# Set the working directory
WORKDIR /home/node/app

# Copy package.json and package-lock.json for production installation
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm install --production

# Copy built artifacts from the builder stage
COPY --from=builder /home/node/app/build ./build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "build/server/index.js"]
