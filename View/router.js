import VueRouter from 'vue-router'
import Vue from 'vue'

// Import Vue components
import Home from './components/Home.vue'
import AddUser from './components/AddUser.vue'
import AddStudent from './components/AddStudent.vue'
import AddProject from './components/AddProject.vue'
import AddEvent from './components/AddEvent.vue'
import Events from './components/Events.vue'
import Login from './components/Login.vue'


import { store } from './store'
import { LOGGEDIN_USER_QUERY } from './constants/UsersLoggedIn.gql'
import { apolloClient } from './apollo'

// Create routes
const routes = [
    { path: '/', component: Home, name: 'home' },
    { path: '/addUser', component: AddUser, name: 'addUser' },
    { path: '/addStudent', component: AddStudent, name: 'addStudent' },
    { path: '/addProject', component: AddProject, name: 'addProject' },
    { path: '/addEvent', component: AddEvent, name: 'addEvent' },
    { path: '/events', component: events, name: 'events' },
    { path: '/login', component: Login, name: 'login' },
]

Vue.use(VueRouter)

// Init routes
const router = new VueRouter({
    mode: 'history',
    routes,
})

// Function who checked if user is login
function loggedIn(data){
    return data.data.loggedInUser && data.data.loggedInUser.id !== ''
}

router.beforeEach((to, from, next) => {
    apolloClient.query({
        query: LOGGEDIN_USER_QUERY,
    }).then(data => {
        if (loggedIn(data) === null && to.name !== 'login') {
            next({ name: 'login' });
            console.log('Vous n etes pas connecter')
        } else if (loggedIn(data) !== null) {
            store.commit('getUserId', data.data.loggedInUser.id);
            next();
            console.log('Vous etes connecter')
        } else {
            next();
        }
        if (loggedIn(data) !== null && to.name === 'login') {
            store.commit('getUserId', data.data.loggedInUser.id);
            next({ name: 'home' });
        }
    }).catch(error => {
        console.error(error)
    });
})

export default router