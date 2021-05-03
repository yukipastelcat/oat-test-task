import { patch } from '../core/dom'

export default class Component {
  /**
   * @param {Object} props - component's props
   * @param {Object} slots - slots are functions, returning VNodes, that will be appended
   * in some place inside component
   */
  constructor (props = {}, slots = {}) {
    this.refs = {}
    Component.makeReactive(this, 'props', props)
    Component.makeReactive(this, 'slots', slots)
  }

  /**
   * Mounts component to some element in DOM
   * @param {HTMLElement} el
   */
  mount (el) {
    this.root = el
    this.patch()
  }

  /**
   * Patches component's Virtual DOM
   * Called when reactive object properties was changed
   */
  patch () {
    if (!this.root) {
      return
    } else {
      this.root = patch(this.root, this.render())
    }
  }

  /**
   * Makes reactive state inside component
   * @param {Component} component
   * @param {string} key - name of the state
   * @param {Object} object - initial value of the state
   */
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
