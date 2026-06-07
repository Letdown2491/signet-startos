# Signet

Signet is a NIP-46 remote signer ("bunker") for Nostr. It holds your private keys on your server and signs events for connected Nostr apps over relays — your keys never leave the box.

## Getting set up

1. Open Signet's **Dashboard** tab and click the **Web UI** interface to open the dashboard.
2. On the **Keys** page, add a key (generate a new one or import an `nsec`/`ncryptsec`). Encrypting the key with a passphrase is recommended.
3. Connect an app:
   - **bunker://** — on a key, click "Generate bunker URI" and paste it into your Nostr app's remote-signer settings, or
   - **nostrconnect://** — paste the URI your app shows into the **Apps** page and pick a key + trust level.
4. Approve incoming requests from the dashboard. Locked keys must be unlocked (with their passphrase) before they can sign.

## Notes for StartOS

- **Access & security:** the dashboard is reached over your StartOS LAN address, `.onion`, or a custom domain. StartOS provides the network boundary, so Signet's own HTTP auth is left off; treat anyone who can reach the interface as an administrator.
- **Relays:** manage the relay list under **Settings → Relays** in the dashboard.
- **Backups:** the `main` volume holds the encrypted key store (`signet.json`) and the SQLite database; both are included in StartOS backups.

## Documentation

- [Signet upstream docs](https://github.com/Letdown2491/signet) — full configuration, security model, and API reference.
