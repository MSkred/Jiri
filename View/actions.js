import { USER_QUERY } from './constants/user.gql'
import { ALL_STUDENT_QUERY } from './constants/StudentsAll.gql'

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
    setAllStudents({state, commit, mutations}){
        apolloClient.query({
            query: ALL_STUDENT_QUERY,
        }).then(data => {
            let allStudents = data.data.allStudents
            commit('students', allStudents)
        }).catch(error => {
            console.log("---Students recuperation failed " + error)
        });
    }
}