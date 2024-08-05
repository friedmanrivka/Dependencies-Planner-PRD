# Use the official Node.js 14 image as the base
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY src/ ./src

# Install TypeScript globally to compile TypeScript files
RUN npm install -g typescript

# Compile TypeScript files
RUN tsc -p .

# Expose the port the app runs on
EXPOSE 3001

# Command to run the application
CMD ["npm", "run", "dev"]  # or CMD ["npm", "start"] if using the start script
