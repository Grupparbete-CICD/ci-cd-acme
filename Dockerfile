FROM node:20-alpine

# Install Nginx and supervisor
RUN apk update && apk add --no-cache nginx supervisor

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Set build-time environment variables
ARG POSTGRES_URL
ENV POSTGRES_URL=${POSTGRES_URL}
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