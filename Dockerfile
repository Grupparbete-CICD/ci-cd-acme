FROM node:20-alpine

# Installera Nginx och supervisor
RUN apk update && apk add --no-cache nginx supervisor

WORKDIR /app

# Kopiera package.json och installera beroenden
COPY package*.json ./
RUN npm install

# Kopiera resten av applikationen
COPY . .

# Sätt bygg-argument och miljövariabler
ARG BUILD_PHASE=false
ARG POSTGRES_URL
ARG AUTH_SECRET
ARG AUTH_URL
ENV BUILD_PHASE=${BUILD_PHASE}
ENV POSTGRES_URL=${POSTGRES_URL}
ENV AUTH_SECRET=${AUTH_SECRET}
ENV AUTH_URL=${AUTH_URL}
ENV NODE_ENV=production

# Logga miljövariabler för felsökning
RUN echo "BUILD_PHASE=${BUILD_PHASE}" && echo "POSTGRES_URL=${POSTGRES_URL}" && echo "AUTH_URL=${AUTH_URL}" && echo "NODE_ENV=${NODE_ENV}"

# Bygg applikationen
RUN npm run build

# Kopiera konfigurationsfiler
COPY nginx.conf /etc/nginx/nginx.conf
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Exponera port
EXPOSE 3000

# Starta supervisord
CMD ["/usr/bin/supervisord"]
