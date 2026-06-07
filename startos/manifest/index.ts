import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'signet',
  title: 'Signet',
  license: 'MIT',
  packageRepo: 'https://github.com/Letdown2491/signet-startos',
  upstreamRepo: 'https://github.com/Letdown2491/signet',
  marketingUrl: 'https://github.com/Letdown2491/signet',
  donationUrl: 'https://github.com/Letdown2491/signet',
  description: { short, long },
  volumes: ['main'],
  images: {
    signet: {
      // Build the combined daemon + UI image locally from the bundled submodule.
      source: {
        dockerBuild: {
          workdir: '.',
          dockerfile: 'Dockerfile',
        },
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {},
})
