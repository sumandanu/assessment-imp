FROM oven/bun:latest AS base

WORKDIR /app

# Declare build argument
ARG NEXT_PUBLIC_API_URL 

# Set environment variable from build argument  
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL   

# Copy package.json and bun.lock for dependency installation
COPY package.json bun.lock ./

# Install dependencies using Bun
RUN bun install

# Stage 2: Development environment
FROM base AS dev

# Copy the rest of the application code
COPY . .

# Expose the port Next.js runs on (default is 3000)
EXPOSE 3000

# Command to start the Next.js development server with Bun
CMD ["bun", "--bun", "run", "dev"]