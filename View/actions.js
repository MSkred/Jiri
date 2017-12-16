import { USER_QUERY } from './constants/user.gql'
import { ALL_STUDENT_QUERY } from './constants/StudentsAll.gql'
import { ALL_USER_QUERY } from './constants/UsersAll.gql'
import { ALL_PROJECT_QUERY } from './constants/ProjectsAll.gql'
import { ALL_EVENT_QUERY } from './constants/EventsAll.gql'
import { SINGLE_EVENT_QUERY } from './constants/Event.gql'


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
    setAllUsers({ state, commit, mutations }) {
        apolloClient.query({
            query: ALL_USER_QUERY,
        }).then(data => {
            let allUsers = data.data.allUsers
            commit('jurys', allUsers)
        }).catch(error => {
            console.log("---Users recuperation failed " + error)
        });
    },
    setAllStudents({state, commit, mutations}){
        apolloClient.query({
            query: ALL_STUDENT_QUERY,
        }).then(data => {
            let allStudents = data.data.allStudents
            commit('students', allStudents)
        }).catch(error => {
            console.log("---Students recuperation failed " + error)
        });
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
        }).then(data => {
            let singleEvent = data.data.allEvents[0]
            commit('event', singleEvent)
        }).catch(error => {
            console.log("---Event recuperation failed " + error)
        })
    }
}