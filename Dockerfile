# Multi-stage build for Next.js application with Prisma
# Stage 1: Dependencies
FROM node:22-alpine AS deps

# Install necessary packages for Prisma
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Stage 2: Builder
FROM node:22-alpine AS builder

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Set DATABASE_URL for build time
ARG DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tttech"
ENV DATABASE_URL=$DATABASE_URL

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application source
COPY . .

# Generate Prisma Client (schema.prisma has no url - using adapter in code)
RUN npx prisma generate

# Create prisma.config.ts for migrations (needed for prisma migrate deploy)
RUN echo 'import { defineConfig, env } from "prisma/config";' > prisma.config.ts && \
    echo 'export default defineConfig({' >> prisma.config.ts && \
    echo '  schema: "prisma/schema.prisma",' >> prisma.config.ts && \
    echo '  datasource: { url: env("DATABASE_URL") },' >> prisma.config.ts && \
    echo '});' >> prisma.config.ts

# Build Next.js application
RUN npm run build

# Stage 3: Runner (Production)
FROM node:22-alpine AS runner

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/package.json ./package.json

# Copy startup script
COPY --from=builder /app/node_modules ./node_modules

# Change ownership to non-root user
RUN chown -R nextjs:nodejs /app

USER nextjs

# Expose port 3000
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# DATABASE_URL should be provided as environment variable at runtime
# It's required for prisma migrate deploy

# Create startup script to run migrations and start app
# prisma.config.ts is available for migrate deploy
CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]
