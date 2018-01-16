import VueRouter from 'vue-router'
import Vue from 'vue'

// Import Vue components
import Home from './components/Home.vue'
import AddUser from './components/AddUser.vue'
import Users from './components/Users.vue'
import User from './components/User.vue'
import AddStudent from './components/AddStudent.vue'
import Students from './components/Students.vue'
import Student from './components/Student.vue'
import AddProject from './components/AddProject.vue'
import Projects from './components/Projects.vue'
import AddEvent from './components/AddEvent.vue'
import EditEvent from './components/EditEvent.vue'
import Events from './components/Events.vue'
import SingleEvent from './components/Event.vue'
import AddMeeting from './components/AddMeeting.vue'
import Meeting from './components/Meeting.vue'
import Login from './components/Login.vue'


import { store } from './store'
import { LOGGEDIN_USER_QUERY } from './constants/UsersLoggedIn.gql'
import { apolloClient } from './apollo'

// Create routes
const routes = [
    { path: '/', component: Home, name: 'home', meta: {isAdmin: false} },

    { path: '/addUser', component: AddUser, name: 'addUser', meta: {isAdmin: true} },
    { path: '/users', component: Users, name: 'users', meta: {isAdmin: true} },
    { path: '/user/:id', component: User, name: 'user', props: true, meta: {isAdmin: true} },


    { path: '/addStudent', component: AddStudent, name: 'addStudent', meta: {isAdmin: true} },
    { path: '/students', component: Students, name: 'students', meta: {isAdmin: true} },
    { path: '/student/:id', component: Student, name: 'student', props: true, meta: {isAdmin: true} },


    { path: '/addProject', component: AddProject, name: 'addProject', meta: {isAdmin: true} },
    { path: '/projects', component: Projects, name: 'projects', meta: {isAdmin: true} },


    { path: '/addEvent', component: AddEvent, name: 'addEvent', meta: {isAdmin: true} },
    { path: '/editEvent/:id', component: EditEvent, name: 'editEvent', props: true, meta: {isAdmin: true} },
    { path: '/events', component: Events, name: 'events', meta: {isAdmin: true} },
    { path: '/event/:id', component: SingleEvent, name: 'event', props: true, meta: {isAdmin: false} },

    { path: '/event/:id/addMeeting', component: AddMeeting, name: 'addMeeting', props: true, meta: {isAdmin: false} },
    { path: '/event/:eventId/meeting/:id/student/:studentId', component: Meeting, name: 'meeting', props: true, meta: {isAdmin: false} },


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
        fetchPolicy: 'network-only',
    }).then(data => {
        if(to.meta.isAdmin === true && data.data.loggedInUser.isAdmin == false) {
          return next({name: 'home'});
        }else{
            next();
        }
        if (loggedIn(data) === null && to.name !== 'login') {
            return next({ name: 'login' });
        } else if (loggedIn(data) !== null) {
            store.commit('getUserId', data.data.loggedInUser.id);
            if(data.data.loggedInUser.isAdmin){
                next();
            }
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