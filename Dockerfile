# Use the official Node.js image as a base
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port on which Next.js runs
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
