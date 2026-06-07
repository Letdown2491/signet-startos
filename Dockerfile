# Combined Signet image for StartOS: builds the NIP-46 daemon and the web
# dashboard from the bundled `signet` submodule and runs both in one container.

FROM node:20-slim AS build
WORKDIR /app
# Pinned pnpm for reproducible builds (matches the upstream repo).
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

# Bring in the whole Signet monorepo (git submodule).
COPY signet/ ./

# Install the full workspace (builds native better-sqlite3 + @signet/types via prepare).
RUN pnpm install --frozen-lockfile

# Build the daemon (prisma generate + tsup) and the UI (vite).
ENV DATABASE_URL="file:/app/config/signet.db"
RUN pnpm --filter signet run build \
 && pnpm --filter signet-ui run build

# ---------------------------------------------------------------------------
FROM node:20-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
RUN apt-get update \
 && apt-get install -y --no-install-recommends openssl wget ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# Workspace + daemon
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-workspace.yaml ./
COPY --from=build /app/packages/signet-types ./packages/signet-types
COPY --from=build /app/apps/signet/node_modules ./apps/signet/node_modules
COPY --from=build /app/apps/signet/package.json ./apps/signet/
COPY --from=build /app/apps/signet/dist ./apps/signet/dist
COPY --from=build /app/apps/signet/prisma ./apps/signet/prisma
COPY --from=build /app/apps/signet/prisma.config.ts ./apps/signet/prisma.config.ts

# UI server
COPY --from=build /app/apps/signet-ui/node_modules ./apps/signet-ui/node_modules
COPY --from=build /app/apps/signet-ui/package.json ./apps/signet-ui/
COPY --from=build /app/apps/signet-ui/dist ./apps/signet-ui/dist
COPY --from=build /app/apps/signet-ui/server.mjs ./apps/signet-ui/server.mjs

# Combined entrypoint (runs migrations, then daemon + UI)
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Defaults (StartOS also passes these via the daemon's env; kept here so the
# image is runnable with a plain `docker run` too).
ENV DATABASE_URL="file:/app/config/signet.db" \
    SIGNET_HOST=127.0.0.1 \
    SIGNET_PORT=3000 \
    UI_HOST=0.0.0.0 \
    UI_PORT=4174 \
    DAEMON_URL=http://127.0.0.1:3000

EXPOSE 4174
ENTRYPOINT ["/app/docker-entrypoint.sh"]
