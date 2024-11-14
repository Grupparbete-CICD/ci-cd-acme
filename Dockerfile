FROM node:20-alpine

# Install Nginx and Supervisor
RUN apk update && apk add --no-cache nginx supervisor

# Add non-root users for Nginx and Node.js
RUN adduser -D -g 'nginx user' nginx
RUN adduser -D -g 'node user' node

# Create necessary directories for logs and set permissions
RUN mkdir -p /var/log/nginx /var/log/node && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R node:node /var/log/node

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

# Expose port 80 for Nginx
EXPOSE 80

# Start Supervisord
CMD ["/usr/bin/supervisord"]
