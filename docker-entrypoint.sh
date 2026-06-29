#!/bin/bash
# Combined entrypoint for the StartOS Signet package: applies DB migrations,
# then starts the NIP-46 daemon (loopback) and the web dashboard as children
# of this shell, which stays PID 1 to supervise them. That gives StartOS the
# two behaviors the upstream relies on a supervisor for:
#   - SIGTERM on stop/update is forwarded to the daemon, so its graceful
#     shutdown (drain in-flight requests, close relays, checkpoint the
#     SQLite WAL) actually runs;
#   - if either process dies, the container exits non-zero, so StartOS sees
#     the failure and restarts the service instead of reporting a healthy
#     dashboard with a dead signing backend.
set -e

mkdir -p /app/config

# --- Database migrations (run via the daemon's local prisma binary) ---
cd /app/apps/signet
echo "Running database migrations..."
# A migration failure must abort startup: a daemon running against a schema
# that doesn't match its generated Prisma client fails every query at runtime
# while looking alive (mirrors upstream's scripts/start.js behavior).
./node_modules/.bin/prisma migrate deploy

# --- Signet daemon (REST API + NIP-46), bound to loopback ---
echo "Starting Signet daemon..."
node ./dist/index.js start --config /app/config/signet.json &
DAEMON_PID=$!

# --- Web dashboard (proxies to the daemon over localhost) ---
echo "Starting Signet dashboard..."
cd /app/apps/signet-ui
node server.mjs &
UI_PID=$!

shutdown() {
  kill -TERM "$DAEMON_PID" "$UI_PID" 2>/dev/null || true
}
# StartOS delivers SIGTERM to PID 1 only (not the process group), so this
# trap is the only path by which the daemon learns about a stop/update.
trap shutdown TERM INT

# Block until either child exits or a signal interrupts the wait, then bring
# the other child down and propagate the status (143 on SIGTERM, the crashed
# child's code otherwise).
set +e
wait -n "$DAEMON_PID" "$UI_PID"
STATUS=$?
shutdown
wait "$DAEMON_PID" "$UI_PID"
exit "$STATUS"
