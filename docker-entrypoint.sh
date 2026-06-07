#!/bin/sh
# Combined entrypoint for the StartOS Signet package: applies DB migrations,
# starts the NIP-46 daemon on loopback, then runs the web dashboard in the
# foreground (StartOS health-checks the UI port).
set -e

mkdir -p /app/config

# --- Database migrations (run via the daemon's local prisma binary) ---
cd /app/apps/signet
echo "Running database migrations..."
./node_modules/.bin/prisma migrate deploy || echo "migrations exited non-zero (continuing)"

# --- Signet daemon (REST API + NIP-46), bound to loopback ---
echo "Starting Signet daemon..."
node ./dist/index.js start --config /app/config/signet.json &
DAEMON_PID=$!

# If the daemon exits, take the whole container down so StartOS restarts it.
trap 'kill "$DAEMON_PID" 2>/dev/null || true' TERM INT

# --- Web dashboard (proxies to the daemon over localhost) ---
echo "Starting Signet dashboard..."
cd /app/apps/signet-ui
exec node server.mjs
