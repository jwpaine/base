# Use a Debian-based Node.js image for better compatibility with prebuilt binaries
FROM node:18.8-bullseye-slim as base

# Set the working directory
WORKDIR /home/node/app

# Install necessary global tools
RUN npm install -g cross-env nodemon

# Builder stage for building the application
FROM base as builder

# Set the working directory
WORKDIR /home/node/app

# Copy package.json and yarn.lock for caching dependencies
COPY package.json yarn.lock ./

# Install all dependencies, including development dependencies
RUN yarn install

# Copy the application source code
COPY . .

# Build the application
RUN yarn build

# Runtime stage for running the application
FROM base as runtime

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js

# Set the working directory
WORKDIR /home/node/app

# Copy package.json and yarn.lock for production installation
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --production

# Copy built artifacts from the builder stage
COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/build ./build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/server.js"]
