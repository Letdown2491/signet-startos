// Build-time guard: the s9pk manifest version (startos/versions/current.ts)
// and the bundled Signet submodule (signet/VERSION) must move in lockstep.
// The manifest version comes solely from current.ts and the shipped code
// solely from the submodule pin, so nothing else catches a desync — without
// this check a mismatched bump produces a signed, mislabeled release.
import { readFileSync } from 'node:fs'

const root = new URL('..', import.meta.url)
const submodule = readFileSync(new URL('signet/VERSION', root), 'utf8').trim()
const currentTs = readFileSync(
  new URL('startos/versions/current.ts', root),
  'utf8',
)

// Matches e.g. version: '1.11.0:0' — the ':0' is the package revision and is
// allowed to differ from the upstream version.
const match = currentTs.match(/version:\s*'([^':]+):\d+'/)
if (!match) {
  console.error(
    'check-version: no version string found in startos/versions/current.ts',
  )
  process.exit(1)
}

if (match[1] !== submodule) {
  console.error(
    `check-version: startos/versions/current.ts declares ${match[1]} but ` +
      `signet/VERSION is ${submodule} — bump both in lockstep (see UPDATING.md)`,
  )
  process.exit(1)
}

console.log(`check-version: ${match[1]} matches signet/VERSION`)
