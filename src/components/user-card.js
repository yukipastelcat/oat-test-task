import {
  h
} from 'snabbdom'
import { getUser } from '../api/users'
import Component from '../core/component'
import Toastify from 'toastify-js'

export default class UserCard extends Component {
  constructor (
    props = {
      id: null
    }
  ) {
    super(props)

    Component.makeReactive(this, 'userState', {
      pending: false,
      user: null
    })

    this.fetchUser()
  }

  async fetchUser () {
    this.userState.pending = true
    try {
      this.userState.user = await getUser(this.props.id)
    } catch (error) {
      Toastify({
        text: 'Couldn\'t fetch users',
        backgroundColor: 'rgba(239,68,68)',
        className: 'text-white'
      }).showToast()
    } finally {
      this.userState.pending = false
    }
  }

  capitalize (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  get fullName () {
    return [this.userState.user.lastName, this.userState.user.firstName]
      .filter(item => !!item)
      .map(this.capitalize)
      .join(' ')
  }

  render () {
    const avatar = () => h(
      'div.flex.flex-col',
      [
        h(
          'img',
          {
            attrs: {
              src: this.userState.user.picture,
              alt: this.fullName,
              width: 80,
              height: 'auto'
            }
          })
      ]
    )
    const fullName = () => h(
      'div.flex.flex-col',
      [
        h('span.text-xl', 'Full name'),
        h(
          'span.mt-1',
          this.fullName
        )
      ]
    )
    const gender = () => h(
      'div.flex.flex-col',
      [
        h('span.text-xl', 'Gender'),
        h(
          'span.mt-1',
          this.userState.user.gender
        )
      ]
    )
    const email = () => h(
      'div.flex.flex-col',
      [
        h('span.text-xl', 'Email'),
        h(
          'span.mt-1',
          this.userState.user.email
        )
      ]
    )
    const address = () => h(
      'div.flex.flex-col',
      [
        h('span.text-xl', 'Address'),
        h(
          'span.mt-1',
          this.userState.user.address
        )
      ]
    )

    return h(
      'div.grid.grid-flow-row.gap-3',
      this.userState.pending ? 'Loading...' : [
        this.userState.user.picture ? avatar() : null,
        this.fullName ? fullName() : null,
        this.userState.user.gender ? gender() : null,
        this.userState.user.email ? email() : null,
        this.userState.user.address ? address() : null
      ]
    )
  }
}
