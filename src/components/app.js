import {
  h,
} from 'snabbdom'
import Component from '../core/component'
import ListComponent from './list'
import FiltersComponent from './filters'
import { getUsers } from '../api/users'

export default class App extends Component {
  constructor(props, slots) {
    super(props, slots)

    Component.makeReactive(this, 'usersState', {
      pending: false,
      items: [],
      query: null
    })

    this.fetchUsers()
  }

  render () {
    return h('div', [
      h('h1', 'Users list'),
      new FiltersComponent({
        onChange: (evt) => {
          this.fetchUsers(evt.target.value)
        }
      }).render(),
      new ListComponent(
        {
          items: this.usersState.items,
        },
        {
          listItem: (item) => h(
            'span',
            [item.lastName, item.firstName]
              .filter(item => !!item)
              .map(this.capitalize)
              .join(' ')
          )
        }
      ).render()
    ])
  }

  capitalize (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  async fetchUsers (query) {
    this.usersState.pending = true
    try {
      this.usersState.items = await getUsers(20, 0, query)
    } catch (error) {
      // TODO: handle error
    } finally {
      this.usersState.pending = false
    }
  }
}
