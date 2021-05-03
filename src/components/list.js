import {
  h
} from 'snabbdom'
import Component from '../core/component'

export default class ListComponent extends Component {
  constructor (
    props = {
      loading: false,
      items: []
    },
    slots = {
      listItem: (item) => item
    }
  ) {
    super(props, slots)
  }

  render () {
    return h(
      'ul',
      this.props.items.map((item) => h('li', this.slots.listItem(item)))
    )
  }
}
