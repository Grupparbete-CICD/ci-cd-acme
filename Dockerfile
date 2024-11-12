# Använd Node.js Alpine som basbild
FROM node:20-alpine
# Installera Nginx och supervisor
RUN apk update && apk add --no-cache nginx supervisor
WORKDIR /app
# Kopiera package.json och installera beroenden
COPY package*.json ./
RUN npm install
# Kopiera hela projektet
COPY . .
# Bygg Next.js-applikationen
RUN npm run build
# Kopiera Nginx och supervisor konfiguration
COPY nginx.conf /etc/nginx/nginx.conf
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
# Öppna port 3000
EXPOSE 3000
# Starta supervisord som hanterar både Next.js och Nginx
CMD ["/usr/bin/supervisord"]