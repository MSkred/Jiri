
import { DESACTIVATE_PROJECT_MUTATION } from './constants/ProjectDesactivate.gql'


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