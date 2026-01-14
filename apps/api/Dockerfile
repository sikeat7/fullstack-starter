# ===========================================
# Dockerfile para Desarrollo
# Optimizado para hot-reload y debugging
# ===========================================
FROM node:20-alpine

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias con cache optimizado
RUN pnpm install --frozen-lockfile

# Copiar código fuente
COPY . .

# GENERAR PRISMA CLIENT
RUN pnpm prisma generate

# Exponer puerto
EXPOSE 3000

# Health check para desarrollo
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Comando para desarrollo
CMD ["pnpm", "run", "start:dev"]