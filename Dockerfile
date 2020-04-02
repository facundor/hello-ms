# Base image
FROM node:latest
# Create app directory
WORKDIR /usr/src/app
# Copy configuration file to form a new image layer (not comonly change)
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy app source
COPY . .
# Expouse internal port
EXPOSE 3000
# Start MS
CMD npm start