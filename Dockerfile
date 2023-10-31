# Use an official Node runtime as the base image
FROM arm64v8/node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application files
COPY . .

# Expose the port your app is running on
EXPOSE 3030

# Define the command to run your app
CMD ["node", "server.js"]
