import {
  h,
} from 'snabbdom'
import Component from '../core/component'
import ListComponent from './list'
import FiltersComponent from './filters'
import UserCard from './user-card'
import ModalComponent from './modal'
import Toastify from 'toastify-js'
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

  async fetchUsers () {
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
      Toastify({
        text: 'Couldn\'t fetch users',
        backgroundColor: 'rgba(239,68,68)',
        className: 'text-white'
      }).showToast()
    } finally {
      this.usersState.pending = false
    }

    this.usersState.items = [...this.usersState.items, ...result]
  }

  capitalize (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  createUserModal (userId) {
    const root = document.createElement('div')
    document.body.appendChild(root)
    const modal = new ModalComponent(
      {
        onClose: () => {
          modal.root.elm.remove()
        },
      },
      {
        default: () => h('div', {
          hook: {
            insert: (vnode) => {
              new UserCard({
                id: userId
              }).mount(vnode.elm)
            }
          }
        })
      }
    )
    modal.mount(root)
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
        loading: this.usersState.pending
      },
      {
        listItem: (item) => h(
          'button',
          {
            on: {
              click: () => {
                this.createUserModal(item.userId)
              }
            }
          },
          [item.lastName, item.firstName]
            .filter(item => !!item)
            .map(this.capitalize)
            .join(' ')
        ),
        emptyList: () => h(
          'div',
          'No elements found. Consider changing the search query.'
        )
      }
    ).render()
    const showMoreBtn = h(
      'button.bg-blue-500.text-white.p-3.rounded-md.mt-4',
      {
        class: {
          'opacity-50': this.usersState.pending
        },
        attrs: {
          disabled: this.usersState.pending
        },
        on: {
          click: () => {
            this.offset += this.limit
            this.fetchUsers()
          }
        }
      },
      'Load more'
    )

    return h('div.container.mx-auto', [
      h('h1.text-5xl.leading-relaxed', 'Users list'),
      filters,
      h('div.mt-2', list),
      this.showMoreBtn ? showMoreBtn : null
    ])
  }
}
