# syntax=docker/dockerfile:1.7
# Build context: repository root.
FROM node:20-bookworm-slim AS build
WORKDIR /repo
COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/
COPY apps/api/package.json apps/api/
RUN --mount=type=cache,target=/root/.npm npm ci --workspace @biomed/web --include-workspace-root=false
COPY apps/web apps/web
RUN npm run build --workspace @biomed/web

FROM nginxinc/nginx-unprivileged:1.27-alpine AS runtime
COPY infra/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /repo/apps/web/dist /usr/share/nginx/html
EXPOSE 8080
HEALTHCHECK --interval=10s --timeout=3s --retries=5 CMD wget -qO- http://127.0.0.1:8080/healthz || exit 1
