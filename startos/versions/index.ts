import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v1_10_0 } from './v1_10_0'
import { v1_10_1 } from './v1_10_1'

export const versionGraph = VersionGraph.of({
  current,
  other: [v1_10_0, v1_10_1],
})
