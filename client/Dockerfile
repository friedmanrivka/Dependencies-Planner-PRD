
__tpx__# Use the official Node.js image as the base
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY ./ ./

# Build the client application
RUN npm run build

# Install a simple server to serve the static files
RUN npm install -g serve

# Expose the port the client app runs on
EXPOSE 3000

# Command to serve the application
CMD ["serve", "-s", "build"]
