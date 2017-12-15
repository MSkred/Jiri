import { USER_QUERY } from './constants/User.gql'
import { apolloClient } from './apollo'

export const actions = {
    setCurrentUser({ state, commit, mutations }) {
        let id = state.userId;
        apolloClient.query(
            {
                query: USER_QUERY,
                variables: {
                    id
                }
            }
        ).then(data => {
            commit('currentUser', data.data.User)
        }).catch(e => {
            console.log(e)
        })
    }
}