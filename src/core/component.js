import { patch } from '../core/dom'

export default class Component {
  constructor (props = {}, slots = {}) {
    this.refs = {}
    Component.makeReactive(this, 'props', props)
    Component.makeReactive(this, 'slots', slots)
  }

  mount (el) {
    this.root = el
    this.patch()
  }

  patch () {
    if (!this.root) {
      return
    } else {
      this.root = patch(this.root, this.render())
    }
  }

  static makeReactive (component, key, object) {
    Object.defineProperty(component, key, {
      configurable: true,
      get () {
        return new Proxy(object, {
          set () {
            Reflect.set(...arguments)
            component.patch()
            return true
          }
        })
      },
      set () {
        console.error('Cannot redefine reactive objects')
      }
    })
  } 
}
