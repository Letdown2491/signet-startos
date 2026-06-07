// Shared constants for the Signet package.

// Port the bundled web dashboard (UI server) listens on inside the container.
// The Signet daemon's REST API listens on 3000 but stays internal — only the
// dashboard is exposed as a StartOS interface.
export const uiPort = 4174
