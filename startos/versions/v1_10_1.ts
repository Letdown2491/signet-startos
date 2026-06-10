import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v1_10_1 = VersionInfo.of({
  version: '1.10.1:0',
  releaseNotes: {
    en_US:
      'Updates Signet to 1.10.1: adds the NIP-46 logout method so a connected app can end its own session, shown in the activity feed.',
    es_ES:
      'Actualiza Signet a 1.10.1: añade el método logout de NIP-46 para que una aplicación conectada pueda finalizar su propia sesión, visible en el registro de actividad.',
    de_DE:
      'Aktualisiert Signet auf 1.10.1: fügt die NIP-46-Methode „logout“ hinzu, mit der eine verbundene App ihre eigene Sitzung beenden kann; im Aktivitätsprotokoll sichtbar.',
    pl_PL:
      'Aktualizuje Signet do 1.10.1: dodaje metodę logout z NIP-46, dzięki której połączona aplikacja może zakończyć własną sesję, widoczną w dzienniku aktywności.',
    fr_FR:
      "Met à jour Signet vers 1.10.1 : ajoute la méthode logout de NIP-46 permettant à une application connectée de mettre fin à sa propre session, visible dans le journal d'activité.",
  },
  migrations: {
    // No data migration needed from 1.10.0 -> 1.10.1.
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
