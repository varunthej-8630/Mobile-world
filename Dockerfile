# ==============================================================================
# MOBILE WORLD ZÜRICH — MULTI-STAGE DOCKERFILE
# Stage 1: Build Application
# Stage 2: Hardened Nginx Production Runtime
# ==============================================================================

# STAGE 1: Build Frontend Artifacts
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies with frozen lockfile for deterministic builds
COPY package*.json ./
RUN npm ci

# Copy application source
COPY . .

# Compile TypeScript and bundle with Vite
RUN npm run build

# STAGE 2: Production Nginx Server
FROM nginx:1.27-alpine AS production

# Remove default nginx html
RUN rm -rf /usr/share/nginx/html/*

# Copy compiled SPA dist from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy optimized Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Production Health Check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]

