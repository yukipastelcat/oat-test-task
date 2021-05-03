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
      listItem: (item) => item,
      emptyList: () => 'No elements'
    }
  ) {
    super(props, slots)
  }

  render () {
    if (this.props.loading && !this.props.items.length) {
      return h('div', 'Loading...')
    }

    if (!this.props.loading && !this.props.items.length) {
      return h('div', this.slots.emptyList())
    }

    return h(
      'ul',
      {
        class: {
          'opacity-50': this.props.loading
        }
      },
      this.props.items.map((item) => h('li', this.slots.listItem(item)))
    )
  }
}
