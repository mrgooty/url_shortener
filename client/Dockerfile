# Stage 1: Build the React application
FROM node:14 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's source code
COPY . .

# Compile TypeScript files
RUN npm run tsc

# Build the React application
RUN npm run build

# Stage 2: Serve the built application with Nginx
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 8000
EXPOSE 8000

# Configure Nginx to listen on the appropriate port
RUN sed -i 's/listen\(.*\)80;/listen 8000;/' /etc/nginx/conf.d/default.conf

# Start Nginx and keep the process from backgrounding and the container from quitting
CMD ["nginx", "-g", "daemon off;"]
