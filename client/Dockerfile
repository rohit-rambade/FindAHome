# Stage 1: Build Stage
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production Stage
FROM nginx

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static content
RUN rm -rf ./*

# Copy built assets from the build stage
COPY --from=build /app/dist .

# Configure NGINX to run in foreground
ENTRYPOINT ["nginx", "-g", "daemon off;"]
