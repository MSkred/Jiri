import { USER_QUERY } from './constants/User.gql'
import { DESACTIVATE_USER_MUTATION } from './constants/UserDesactivate.gql'
import { ALL_STUDENT_QUERY } from './constants/StudentsAll.gql'
import { DESACTIVATE_STUDENT_MUTATION } from './constants/StudentDesactivate.gql'
import { STUDENT_QUERY } from './constants/Student.gql'
import { ALL_USER_QUERY } from './constants/UsersAll.gql'
import { ALL_PROJECT_QUERY } from './constants/ProjectsAll.gql'
import { DESACTIVATE_PROJECT_MUTATION } from './constants/ProjectDesactivate.gql'
import { ALL_EVENT_QUERY } from './constants/EventsAll.gql'
import { DESACTIVATE_EVENT_MUTATION } from './constants/EventDesactivate.gql'
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
            console.log('userdata')
          commit('getUserData', data.data.User)
        }).catch(e => {
          console.log(e)
        })
    },
}