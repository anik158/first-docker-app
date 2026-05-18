# Stage 1: Build (we can add more later)
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# Stage 2: Production (smaller final image)
FROM node:20-alpine

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app /app

# Run as non-root user (security best practice)
USER node

CMD ["node", "app.js"]