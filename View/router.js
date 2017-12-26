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
import Events from './components/Events.vue'
import SingleEvent from './components/Event.vue'
import AddMeeting from './components/AddMeeting.vue'
import Meeting from './components/Meeting.vue'
import Login from './components/Login.vue'


import { store } from './store'
import { LOGGEDIN_USER_QUERY } from './constants/UsersLoggedIn.gql'
import { ISADMIN_USER_QUERY } from './constants/UsersIsAdmin.gql'
import { apolloClient } from './apollo'

// Create routes
const routes = [
    { path: '/', component: Home, name: 'home' },
    { path: '/addUser', component: AddUser, name: 'addUser' },
    { path: '/users', component: Users, name: 'users' },
    { path: '/user/:id', component: User, name: 'user', props: true },
    { path: '/addStudent', component: AddStudent, name: 'addStudent' },
    { path: '/students', component: Students, name: 'students' },
    { path: '/student/:id', component: Student, name: 'student', props: true },
    { path: '/addProject', component: AddProject, name: 'addProject' },
    { path: '/projects', component: Projects, name: 'projects' },
    { path: '/addEvent', component: AddEvent, name: 'addEvent' },
    { path: '/events', component: Events, name: 'events' },
    { path: '/event/:id', component: SingleEvent, name: 'event', props: true },
    { path: '/event/:id/addMeeting', component: AddMeeting, name: 'addMeeting', props: true },
    { path: '/event/:eventId/meeting/:id/student/:studentId', component: Meeting, name: 'meeting', props: true },
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
function isAdmin(data) {
    return data.data.allUsers && data.data.allUsers !== []
}


router.beforeEach((to, from, next) => {
    apolloClient.query({
        query: LOGGEDIN_USER_QUERY,
    }).then(data => {
        if (loggedIn(data) === null && to.name !== 'login') {
            console.log('Vous n etes pas connecter')
            return next({ name: 'login' });
        } else if (loggedIn(data) !== null) {
            store.commit('getUserId', data.data.loggedInUser.id);
            let id = data.data.loggedInUser.id;
            apolloClient.query({
                query: ISADMIN_USER_QUERY,
                variables: {
                    id
                }
            }).then(data => {
                if (data.data.allUsers.length === 0 ) {
                    console.log('Vous etes connecter non admin')
                    if (to.name == 'event') {
                         next({ name: 'event' });
                    } else if (to.name == 'meeting') {
                        next({ name: 'meeting' });
                    } else if (to.name == 'addMeeting') {
                        next({ name: 'addMeeting' });
                    }else{
                        next({name: 'events'});
                    }
                }
            })
            console.log('Vous etes connecter en admin')
            next();
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