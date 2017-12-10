import Home from './components/Home.vue'
import AddUser from './components/AddUser.vue'
import AddStudent from './components/AddStudent.vue'
import AddProject from './components/AddProject.vue'
import AddEvent from './components/AddEvent.vue'
import Login from './components/Login.vue'

export default [
    { path: '/', component: Home, name: 'home' },
    { path: '/addUser', component: AddUser, name: 'addUser' },
    { path: '/addStudent', component: AddStudent, name: 'addStudent' },
    { path: '/addProject', component: AddProject, name: 'addProject' },
    { path: '/addEvent', component: AddEvent, name: 'addEvent' },
    { path: '/login', component: Login, name: 'login' },
]