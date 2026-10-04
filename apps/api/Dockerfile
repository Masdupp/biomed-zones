# syntax=docker/dockerfile:1.7
# Build context: repository root (npm workspaces share one lockfile).
FROM node:20-bookworm-slim AS base
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /repo

FROM base AS deps
COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
RUN --mount=type=cache,target=/root/.npm npm ci --workspace @biomed/api --include-workspace-root=false

FROM deps AS build
COPY apps/api apps/api
RUN cd apps/api && npx prisma generate && npm run build

FROM base AS runtime
ENV NODE_ENV=production NPM_CONFIG_UPDATE_NOTIFIER=false
COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
RUN --mount=type=cache,target=/root/.npm npm ci --workspace @biomed/api --include-workspace-root=false --omit=dev \
 && npm install --no-save --workspace @biomed/api prisma@6 \
 && npm cache clean --force
COPY --from=build /repo/node_modules/.prisma /repo/node_modules/.prisma
COPY --from=build /repo/apps/api/dist apps/api/dist
COPY apps/api/prisma apps/api/prisma
# Species profiles read by the seed (dist/seed.js resolves /repo/data/reference/species.json).
COPY data/reference data/reference
WORKDIR /repo/apps/api
USER node
EXPOSE 3001
HEALTHCHECK --interval=10s --timeout=3s --start-period=10s --retries=5 \
  CMD node -e "fetch('http://127.0.0.1:3001/health/live').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "dist/index.js"]
