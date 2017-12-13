import Home from './components/Home.vue'
import AddUser from './components/AddUser.vue'
import AddStudent from './components/AddStudent.vue'
import AddProject from './components/AddProject.vue'
import AddEvent from './components/AddEvent.vue'
import Login from './components/Login.vue'

export default [
    { path: '/', component: Home, name: 'home', meta: { requiresAuth: true } },
    { path: '/addUser', component: AddUser, name: 'addUser', meta: { requiresAuth: true }  },
    { path: '/addStudent', component: AddStudent, name: 'addStudent', meta: { requiresAuth: true }  },
    { path: '/addProject', component: AddProject, name: 'addProject', meta: { requiresAuth: true }  },
    { path: '/addEvent', component: AddEvent, name: 'addEvent', meta: { requiresAuth: true }  },
    { path: '/login', component: Login, name: 'login' },
]