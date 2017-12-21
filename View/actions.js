import { USER_QUERY } from './constants/User.gql'
import { ALL_STUDENT_QUERY } from './constants/StudentsAll.gql'
import { STUDENT_QUERY } from './constants/Student.gql'
import { ALL_USER_QUERY } from './constants/UsersAll.gql'
import { ALL_PROJECT_QUERY } from './constants/ProjectsAll.gql'
import { ALL_EVENT_QUERY } from './constants/EventsAll.gql'
import { SINGLE_EVENT_QUERY } from './constants/Event.gql'
import { SINGLE_MEETING_QUERY } from './constants/Meeting.gql'


import {apolloClient} from './apollo'

export const actions = {
    setCurrentUser({state, commit, mutations}) {
        const id = state.userId;
        apolloClient.query(
            {
                query: USER_QUERY,
                variables: {
                  id
                }
            }
        ).then(data => {
          commit('getUserData', data.data.User)
        }).catch(e => {
          console.log(e)
        })
    },
    setAllJurys({ state, commit, mutations }) {
        apolloClient.query({
            query: ALL_USER_QUERY,
        }).then(data => {
            let allUsers = data.data.allUsers
            commit('jurys', allUsers)
        }).catch(error => {
            console.log("---Users recuperation failed " + error)
        });
    },
    setAllUsers({ state, commit, mutations }) {
        apolloClient.query({
            query: ALL_USER_QUERY,
        }).then(data => {
            let allUsers = data.data.allUsers
            commit('users', allUsers)
        }).catch(error => {
            console.log("---Users recuperation failed " + error)
        });
    },
    setUser({ commit }, payload) {
        const id = payload;
        apolloClient.query({
            query: USER_QUERY,
            variables: {
                id
            }
        }).then(data => {
            let singleUser = data.data.User;
            commit('user', singleUser)
        }).catch(error => {
            console.log("---User recuperation failed " + error)
        })
    },
    setAllStudents({context, state, commit, mutations}){
        apolloClient.query({
            query: ALL_STUDENT_QUERY,
        }).then(data => {
            let allStudents = data.data.allStudents
            commit('allStudents', allStudents)
            commit('students', allStudents)
        }).catch(error => {
            console.log("---Students recuperation failed " + error)
        });
    },
    setStudent({ commit }, payload) {
        const id = payload;
        apolloClient.query({
            query: STUDENT_QUERY,
            variables: {
                id
            }
        }).then(data => {
            let singleStudent = data.data.Student;
            commit('student', singleStudent)
        }).catch(error => {
            console.log("---Student recuperation failed " + error)
        })
    },
    setAllProjects({ state, commit, mutations }) {
        apolloClient.query({
            query: ALL_PROJECT_QUERY,
        }).then(data => {
            let allProjects = data.data.allProjects
            commit('projects', allProjects)
        }).catch(error => {
            console.log("---Projects recuperation failed " + error)
        });
    },
    setAllEvents({ state, commit, mutations }){
        apolloClient.query({
            query: ALL_EVENT_QUERY,
        }).then(data => {
            let allEvents = data.data.allEvents
            commit('events', allEvents)
        }).catch(error => {
            console.log("---Events recuperation failed " + error)
        })
    },
    setEvent({ commit }, payload){
        const id = payload;
        apolloClient.query({
            query: SINGLE_EVENT_QUERY,
            variables: {
                id
            }
        }).then(data => {
            let singleEvent = data.data.allEvents[0];
            commit('event', singleEvent)
        }).catch(error => {
            console.log("---Event recuperation failed " + error)
        })
    },
    setMeeting({ commit }, payload){
        const id = payload.id;
        const studentId = payload.studentId;
        apolloClient.query({
            query: SINGLE_MEETING_QUERY,
            variables: {
                id,
                studentId
            }
        }).then(data => {
            let singleMeeting = data.data.allMeetings[0]
            commit('meeting', singleMeeting)
        }).catch(error => {
            console.log("---Meeting recuperation failed " + error)
        })
    }
}