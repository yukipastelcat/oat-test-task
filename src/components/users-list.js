import {
  h,
} from 'snabbdom'
import Component from '../core/component'
import ListComponent from './list'
import FiltersComponent from './filters'
import { getUsers } from '../api/users'

export default class UsersList extends Component {
  constructor(props, slots) {
    super(props, slots)

    Component.makeReactive(this, 'usersState', {
      pending: false,
      items: []
    })

    this.limit = 20
    this.offset = 0
    this.query = null
    this.showMoreBtn = true

    this.fetchUsers()
  }

  render () {
    const filters = new FiltersComponent({
      onChange: (evt) => {
        this.query = evt.target.value
        this.usersState.items = []
        this.offset = 0
        this.fetchUsers()
      }
    }).render()
    const list = new ListComponent(
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
    const showMoreBtn = h('button', {
      on: {
        click: () => {
          this.offset += this.limit
          this.fetchUsers()
        }
      }
    }, 'Load more')

    return h('div', [
      h('h1', 'Users list'),
      filters,
      list,
      this.showMoreBtn ? showMoreBtn : null
    ])
  }

  capitalize (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  async fetchUsers (query) {
    let result = []

    this.usersState.pending = true
    try {
      result = await getUsers(this.limit, this.offset, this.query)
      if (result.length < this.limit) {
        this.showMoreBtn = false
      } else {
        this.showMoreBtn = true
      }
    } catch (error) {
      // TODO: handle error
    } finally {
      this.usersState.pending = false
    }

    this.usersState.items = [...this.usersState.items, ...result]
  }
}
