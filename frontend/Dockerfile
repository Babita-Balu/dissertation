# Use a Node.js base image
FROM node:latest

# Set the working directory
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . ./

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
