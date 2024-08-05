# Use the official Node.js 14 image as the base
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Install the `serve` package globally
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Command to serve the app in production mode
CMD ["serve", "-s", "build"]
