import 'core-js/es7'
import 'regenerator-runtime/runtime'
import UsersList from './components/users-list'
import List from './components/list'

const app = new UsersList()
app.mount(document.querySelector('#app'))

const anyDataList = new List(
  {
    items: [...Array(100).keys()].map((item) => ({ name: `Item ${item}` }))
  },
  {
    listItem: (item) => item.name
  }
)
anyDataList.mount(document.querySelector('#any-data-example'))

