# ===========================================
# Development Dockerfile
# Optimized for hot-reload and debugging
# ===========================================
FROM node:20-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy dependency manifests
COPY package.json pnpm-lock.yaml ./

# Install dependencies with optimized cache
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# GENERAR PRISMA CLIENT
RUN pnpm prisma generate

# Expose port
EXPOSE 3000

# Health check (dev)
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Dev command
CMD ["pnpm", "run", "start:dev"]