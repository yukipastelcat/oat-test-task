import 'core-js/es7'
import 'regenerator-runtime/runtime'
import UsersList from './components/users-list'

const app = new UsersList()
app.mount(document.querySelector('#app'))
