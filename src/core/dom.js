import {
  init,
  datasetModule,
  classModule,
  propsModule,
  styleModule,
  attributesModule,
  eventListenersModule
} from 'snabbdom'

export const patch = init([
  classModule,
  datasetModule,
  propsModule,
  styleModule,
  attributesModule,
  eventListenersModule
])
