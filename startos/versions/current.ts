import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.11.0:0',
  releaseNotes: {
    en_US:
      'Updates Signet to 1.11.0: security hardening (fixes kill-switch command forgery and replay, stronger NIP-46 replay protection, rate-limited key unlock, clickjacking protection for the dashboard), reliability fixes (graceful shutdown, crash reporting to the supervisor, nostrconnect apps reconnect after a restart), and performance improvements (cached inbound crypto for ~2.6× higher throughput, paced relay publishing under request bursts, SQLite WAL mode).',
    es_ES:
      'Actualiza Signet a 1.11.0: refuerzo de seguridad (corrige la falsificación y la reutilización de comandos del interruptor de emergencia, protección antirreutilización de NIP-46 más sólida, límite de intentos al desbloquear claves, protección contra clickjacking en el panel), correcciones de fiabilidad (apagado ordenado, notificación de fallos al supervisor, las aplicaciones nostrconnect se reconectan tras un reinicio) y mejoras de rendimiento (criptografía entrante en caché con ~2,6× más rendimiento, publicación en relés regulada ante ráfagas de solicitudes, modo WAL de SQLite).',
    de_DE:
      'Aktualisiert Signet auf 1.11.0: Sicherheitshärtung (behebt Fälschung und Wiedereinspielung von Kill-Switch-Befehlen, stärkerer NIP-46-Replay-Schutz, Ratenbegrenzung beim Entsperren von Schlüsseln, Clickjacking-Schutz für das Dashboard), Zuverlässigkeitskorrekturen (sauberes Herunterfahren, Absturzmeldung an den Supervisor, nostrconnect-Apps verbinden sich nach einem Neustart wieder) und Leistungsverbesserungen (gecachte eingehende Kryptografie mit ~2,6× höherem Durchsatz, gedrosseltes Relay-Publishing bei Anfragespitzen, SQLite-WAL-Modus).',
    pl_PL:
      'Aktualizuje Signet do 1.11.0: wzmocnienie bezpieczeństwa (naprawia fałszowanie i ponowne odtwarzanie poleceń wyłącznika awaryjnego, silniejsza ochrona przed powtórkami NIP-46, ograniczenie liczby prób odblokowania klucza, ochrona panelu przed clickjackingiem), poprawki niezawodności (poprawne zamykanie, zgłaszanie awarii nadzorcy, aplikacje nostrconnect łączą się ponownie po restarcie) oraz ulepszenia wydajności (buforowana kryptografia przychodząca z ~2,6× wyższą przepustowością, regulowane publikowanie do przekaźników przy seriach żądań, tryb WAL SQLite).',
    fr_FR:
      "Met à jour Signet vers 1.11.0 : renforcement de la sécurité (corrige la falsification et le rejeu des commandes du coupe-circuit, protection anti-rejeu NIP-46 renforcée, limitation du débit au déverrouillage des clés, protection du tableau de bord contre le clickjacking), correctifs de fiabilité (arrêt propre, signalement des plantages au superviseur, reconnexion des applications nostrconnect après un redémarrage) et améliorations de performance (chiffrement entrant mis en cache pour un débit ~2,6× supérieur, publication régulée vers les relais lors des rafales de requêtes, mode WAL de SQLite).",
  },
  migrations: {
    // No data migration needed from 1.10.1 -> 1.11.0.
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
