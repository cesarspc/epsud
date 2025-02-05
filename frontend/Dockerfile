# Use node 18 as base image
FROM node:18

# Directory inside the container
WORKDIR /app

# Copy the source code to the container
COPY frontend/ .

# Install the dependencies
RUN npm install

# Expose the port 3000
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]