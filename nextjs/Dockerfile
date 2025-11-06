# Stage 1: Build the Next.js application with Bun
FROM oven/bun:latest AS builder

# Set working directory
WORKDIR /app

# Copy package.json and bun.lock to leverage Bun's caching
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN bun run build

# Stage 2: Create the final production image
FROM oven/bun:latest AS runner

# Set working directory
WORKDIR /app

# Set environment variables for Next.js production
ENV NODE_ENV=production

# Copy built application and necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# If you have custom server.js or similar, copy it too
# COPY --from=builder /app/server.js ./server.js

# Expose the port Next.js runs on (default is 3000)
EXPOSE 3000

# Start the Next.js application with Bun
CMD ["bun", "run", "start"]