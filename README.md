<p align="center">
  <img src="icon.svg" alt="Signet Logo" width="21%">
</p>

# Signet on StartOS

> **Upstream repo:** <https://github.com/Letdown2491/signet>

[Signet](https://github.com/Letdown2491/signet) is a modern NIP-46 remote signer ("bunker") for Nostr. This repository packages it as a StartOS service (`.s9pk`).

The upstream is a pnpm monorepo with a daemon (`apps/signet`) and a web dashboard (`apps/signet-ui`). It is included here as a git **submodule** at [`./signet`](./signet); the image is built from it locally (no published image required).

---

## Image and Container Runtime

| Property      | Value                                                        |
| ------------- | ----------------------------------------------------------- |
| Image         | `signet` — built locally from `./signet` via `./Dockerfile` |
| Architectures | x86_64, aarch64                                             |
| Command       | `/app/docker-entrypoint.sh`                                 |

The image bundles **both** Signet processes and runs them in one container:

- **Daemon** (NIP-46 signer + REST API) on `127.0.0.1:3000` (internal only).
- **Web dashboard** (UI server) on `0.0.0.0:4174`, reverse-proxying to the daemon over localhost. Only this port is exposed as a StartOS interface.

The entrypoint runs Prisma migrations, starts the daemon, then runs the dashboard in the foreground (which StartOS health-checks).

---

## Volume and Data Layout

| Volume | Mount Point   | Contents                                          |
| ------ | ------------- | ------------------------------------------------- |
| `main` | `/app/config` | `signet.json` (key store + secrets), SQLite DB    |

---

## Network Access and Interfaces

| Interface | Container Port | Protocol | Purpose           |
| --------- | -------------- | -------- | ----------------- |
| Web UI    | 4174           | HTTP     | Signet dashboard  |

The daemon's REST API (`3000`) is **not** exposed — the dashboard proxies to it internally. StartOS provides access control (LAN / `.onion` / custom domain), so Signet's own HTTP auth (`requireAuth`) is left off; the bind/port/baseURL are supplied to the daemon via the StartOS daemon `env`.

---

## Configuration Management

No StartOS config actions in this version. Signet generates its own config on first boot and is managed entirely through the dashboard (keys, apps, relays, dead-man switch).

---

## Health Checks

| Check         | Method                | Notes                                  |
| ------------- | --------------------- | -------------------------------------- |
| Web Interface | Port listening (4174) | Dashboard reachable = daemon+UI booted |

---

## Backups and Restore

The `main` volume (key store + database) is included in backups and fully restored before the service starts.

---

## Dependencies

None.

---

## Building

Requires `start-cli`, Node/npm, and Docker (see the [StartOS Packaging Guide](https://docs.start9.com/packaging)).

```bash
git clone --recurse-submodules https://github.com/Letdown2491/signet-startos
cd signet-startos
npm install
make            # builds the image from ./signet and packs signet.s9pk
make install    # sideload to a configured StartOS server
```

To update the packaged Signet version, bump the submodule:

```bash
cd signet && git fetch && git checkout <tag>   # e.g. v1.10.0
cd .. && git add signet
# bump startos/versions/current.ts, then rebuild
```

---

## Limitations and Differences

1. **Single combined container** — daemon + UI run together (vs. the upstream two-container docker-compose), talking over localhost. Functionally equivalent for a single-node deployment.
2. **No StartOS config/actions yet** — keys, relays, and settings are managed from the dashboard.
3. **`EXTERNAL_URL` is not wired to the StartOS interface origin**, so the standalone HTML approval page (`auth_url`) may reference an internal URL. The primary connection flows (`bunker://` / `nostrconnect://`) work over relays and are unaffected; approvals are done from the dashboard.

---

## Quick Reference for AI Consumers

```yaml
package_id: signet
upstream: https://github.com/Letdown2491/signet  # included as ./signet submodule
image: signet (dockerBuild from ./Dockerfile, context = repo root)
architectures: [x86_64, aarch64]
processes: [daemon :3000 (loopback), ui :4174 (exposed)]
volumes:
  main: /app/config            # signet.json + SQLite DB
interfaces:
  ui: { port: 4174, type: ui }
env (set on the StartOS daemon):
  DATABASE_URL: file:/app/config/signet.db
  SIGNET_HOST: 127.0.0.1
  SIGNET_PORT: 3000
  UI_HOST: 0.0.0.0
  UI_PORT: 4174
  DAEMON_URL: http://127.0.0.1:3000
dependencies: none
actions: none
```
