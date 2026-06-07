import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.10.0:0',
  releaseNotes: {
    en_US: 'Initial StartOS package for Signet 1.10.0.',
    es_ES: 'Paquete inicial de StartOS para Signet 1.10.0.',
    de_DE: 'Erstes StartOS-Paket für Signet 1.10.0.',
    pl_PL: 'Początkowy pakiet StartOS dla Signet 1.10.0.',
    fr_FR: 'Premier paquet StartOS pour Signet 1.10.0.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
