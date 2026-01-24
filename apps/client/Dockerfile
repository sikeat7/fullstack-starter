# ===================================
# Client Production Dockerfile
# Next.js standalone build
# ===================================

# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9 --activate

# Copy workspace configuration
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/client/package.json ./apps/client/
COPY packages/core/package.json ./packages/core/
COPY packages/data/package.json ./packages/data/
COPY packages/i18n/package.json ./packages/i18n/
COPY packages/ui/package.json ./packages/ui/
COPY tooling/typescript/package.json ./tooling/typescript/
COPY tooling/tailwind/package.json ./tooling/tailwind/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9 --activate

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/client/node_modules ./apps/client/node_modules
COPY . .

# Build arguments for environment variables
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Build packages first
RUN pnpm --filter @repo/core build
RUN pnpm --filter @repo/data build

# Build the application
RUN pnpm --filter client build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

# Security: Run as non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone build
COPY --from=builder /app/apps/client/.next/standalone ./
COPY --from=builder /app/apps/client/.next/static ./apps/client/.next/static
COPY --from=builder /app/apps/client/public ./apps/client/public

# Set ownership
RUN chown -R nextjs:nodejs /app

USER nextjs

# Environment
ENV NODE_ENV=production
ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/ || exit 1

# Start the application
CMD ["node", "apps/client/server.js"]
