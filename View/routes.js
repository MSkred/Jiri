import AddUser from './components/AddUser.vue'
import Home from './components/Home.vue'

export default [
    { path: '/', component: Home, name: 'home' },
    { path: '/addUser', component: AddUser, name: 'addUser' },
]