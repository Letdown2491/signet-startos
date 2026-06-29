import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.20.0:0',
  releaseNotes: {
    en_US:
      'Updates Signet to 1.20.0: connected apps now show an avatar — a deterministic pubkey identicon, upgraded to the app’s own image when available, framed by a status ring. The image is fetched server-side through an SSRF-guarded proxy (https-only, private/loopback/cloud-metadata IPs blocked, no redirects, size- and type-capped); the browser never touches the untrusted URL. Connect approvals now display the app’s requested permissions and client metadata, and requests from unknown clients with no session are dropped silently to resist floods. The schema change (a new avatar-URL column) is applied automatically on first boot.',
    es_ES:
      'Actualiza Signet a 1.20.0: las aplicaciones conectadas ahora muestran un avatar: un identicon determinista basado en la clave pública, sustituido por la imagen propia de la aplicación cuando está disponible y enmarcado por un anillo de estado. La imagen se obtiene en el servidor mediante un proxy protegido contra SSRF (solo https, IPs privadas/loopback/metadatos de nube bloqueadas, sin redirecciones, con límites de tamaño y tipo); el navegador nunca toca la URL no confiable. Las aprobaciones de conexión ahora muestran los permisos solicitados y los metadatos del cliente, y las solicitudes de clientes desconocidos sin sesión se descartan en silencio para resistir avalanchas. El cambio de esquema (una nueva columna de URL de avatar) se aplica automáticamente en el primer arranque.',
    de_DE:
      'Aktualisiert Signet auf 1.20.0: Verbundene Apps zeigen jetzt einen Avatar — ein deterministisches Identicon aus dem öffentlichen Schlüssel, ersetzt durch das eigene Bild der App, sofern vorhanden, und von einem Status-Ring umrahmt. Das Bild wird serverseitig über einen SSRF-geschützten Proxy geladen (nur https, private/Loopback-/Cloud-Metadaten-IPs blockiert, keine Weiterleitungen, größen- und typbegrenzt); der Browser berührt die nicht vertrauenswürdige URL nie. Verbindungsfreigaben zeigen nun die angeforderten Berechtigungen und die Client-Metadaten der App, und Anfragen unbekannter Clients ohne Sitzung werden stillschweigend verworfen, um Fluten abzuwehren. Die Schemaänderung (eine neue Avatar-URL-Spalte) wird beim ersten Start automatisch angewendet.',
    pl_PL:
      'Aktualizuje Signet do 1.20.0: połączone aplikacje pokazują teraz awatar — deterministyczny identicon z klucza publicznego, zastępowany własnym obrazem aplikacji, gdy jest dostępny, w ramce pierścienia stanu. Obraz jest pobierany po stronie serwera przez proxy chronione przed SSRF (tylko https, blokada adresów prywatnych/loopback/metadanych chmury, brak przekierowań, limity rozmiaru i typu); przeglądarka nigdy nie dotyka niezaufanego adresu URL. Zatwierdzenia połączeń pokazują teraz żądane uprawnienia i metadane klienta, a żądania od nieznanych klientów bez sesji są po cichu odrzucane, aby opierać się zalewom. Zmiana schematu (nowa kolumna adresu URL awatara) jest stosowana automatycznie przy pierwszym uruchomieniu.',
    fr_FR:
      "Met à jour Signet vers 1.20.0 : les applications connectées affichent désormais un avatar — un identicon déterministe issu de la clé publique, remplacé par l’image propre de l’application lorsqu’elle est disponible et encadré par un anneau d’état. L’image est récupérée côté serveur via un proxy protégé contre le SSRF (https uniquement, IP privées/loopback/métadonnées cloud bloquées, sans redirections, avec limites de taille et de type) ; le navigateur ne touche jamais l’URL non fiable. Les approbations de connexion affichent désormais les permissions demandées et les métadonnées du client, et les requêtes provenant de clients inconnus sans session sont rejetées silencieusement pour résister aux inondations. Le changement de schéma (une nouvelle colonne d’URL d’avatar) est appliqué automatiquement au premier démarrage.",
  },
  migrations: {
    // No StartOS-side data migration needed from 1.11.0 -> 1.20.0. The new
    // KeyUser.imageUrl column is applied inside the container by the daemon's
    // `prisma migrate deploy` step (docker-entrypoint.sh) on first boot.
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
