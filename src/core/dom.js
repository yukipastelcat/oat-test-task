import {
  init,
  datasetModule,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule
} from 'snabbdom'

export const patch = init([
  classModule,
  datasetModule,
  propsModule,
  styleModule,
  eventListenersModule
])
