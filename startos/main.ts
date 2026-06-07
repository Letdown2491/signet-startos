import { i18n } from './i18n'
import { sdk } from './sdk'
import { uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  /**
   * ======================== Setup ========================
   */
  console.info(i18n('Starting Signet'))

  /**
   * ======================== Daemons ========================
   *
   * Signet is a NIP-46 remote signer (daemon, :3000) plus a web dashboard
   * (UI server, :4174) that reverse-proxies to it. Both run inside this one
   * subcontainer and talk over localhost; only the dashboard port is exposed.
   * The bundled entrypoint runs migrations, starts the daemon, then the UI.
   */
  return sdk.Daemons.of(effects).addDaemon('primary', {
    subcontainer: await sdk.SubContainer.of(
      effects,
      { imageId: 'signet' },
      sdk.Mounts.of().mountVolume({
        volumeId: 'main',
        subpath: null,
        mountpoint: '/app/config',
        readonly: false,
      }),
      'signet-sub',
    ),
    exec: {
      command: ['/app/docker-entrypoint.sh'],
      env: {
        DATABASE_URL: 'file:/app/config/signet.db',
        // Daemon REST API stays on loopback; only the UI is exposed.
        SIGNET_HOST: '127.0.0.1',
        SIGNET_PORT: '3000',
        UI_HOST: '0.0.0.0',
        UI_PORT: String(uiPort),
        DAEMON_URL: 'http://127.0.0.1:3000',
      },
    },
    ready: {
      display: i18n('Web Interface'),
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, uiPort, {
          successMessage: i18n('The web dashboard is ready'),
          errorMessage: i18n('The web dashboard is not ready'),
        }),
    },
    requires: [],
  })
})
