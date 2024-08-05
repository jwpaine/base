# Use a Debian-based Node.js 20 image for better compatibility with prebuilt binaries
FROM node:20-bullseye-slim as base

# Set the working directory
WORKDIR /home/node/app

# Install necessary global tools
RUN npm install -g cross-env nodemon

# Builder stage for building the application
FROM base as builder

# Set the working directory
WORKDIR /home/node/app

# Copy package.json and package-lock.json for caching dependencies
COPY package.json package-lock.json ./

# Install all dependencies, including development dependencies
RUN npm install

# Copy the application source code
COPY . .

# Build the application
RUN npm run build

# Runtime stage for running the application
FROM base as runtime

# Set environment variables for production
ENV NODE_ENV=production

# Set the working directory
WORKDIR /home/node/app

# Copy package.json and package-lock.json for production installation
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm install 
# --production

# Copy built artifacts from the builder stage
COPY --from=builder /home/node/app/build ./build

# Expose the application port
EXPOSE 3000

# Start the application using the start script
CMD ["npm", "run", "start"]
