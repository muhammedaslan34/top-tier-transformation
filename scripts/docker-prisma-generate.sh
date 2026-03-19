#!/bin/sh
# Script to generate Prisma client for Docker builds
# Removes prisma.config.ts if it exists, then generates client

if [ -f prisma.config.ts ]; then
  echo "Removing prisma.config.ts for Docker build..."
  rm -f prisma.config.ts
fi

# Add url to schema if it doesn't exist (for Prisma generate)
if ! grep -q "url.*env" prisma/schema.prisma; then
  echo "Adding url to schema.prisma for Docker build..."
  sed -i '/provider = "postgresql"/a\  url      = env("DATABASE_URL")' prisma/schema.prisma
fi

# Generate Prisma client
npx prisma generate
