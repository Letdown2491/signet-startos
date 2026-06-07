export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Signet': 0,
  'Web Interface': 1,
  'The web dashboard is ready': 2,
  'The web dashboard is not ready': 3,

  // interfaces.ts
  'Web UI': 4,
  'The Signet web dashboard': 5,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
