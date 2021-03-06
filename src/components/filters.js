import {
  h
} from 'snabbdom'
import Component from '../core/component'

export default class FiltersComponent extends Component {
  constructor (props = {
    onChange: () => {}
  }) {
    super(props)
  }

  render () {
    const searchInput = h('input.border-2.border-blue-600.rounded-md.ml-2', {
      on: {
        input: this.props.onChange
      }
    })
    const searchInputLabel = h('span', 'Search')
    return h(
      'div',
      [
        h('label', [searchInputLabel, searchInput])
      ]
    )
  }
}
