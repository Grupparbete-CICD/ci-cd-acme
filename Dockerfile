FROM node:20-alpine

# Install Nginx and supervisor
RUN apk update && apk add --no-cache nginx supervisor

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV BUILD_PHASE=true
ENV NODE_ENV=production

# Build the application
RUN npm run build

# Copy configuration files
COPY nginx.conf /etc/nginx/nginx.conf
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose port
EXPOSE 3000

# Start supervisord
CMD ["/usr/bin/supervisord"]
