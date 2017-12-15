import { USER_QUERY } from './constants/user.gql'
import {apolloClient} from './apollo'

export const actions = {
    setCurrentUser({state, commit, mutations}) {
        let id = state.currentUserId;
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
    }
}