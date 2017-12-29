import Vue from 'vue'
import { apolloClient }  from './apollo'
import { store } from './store'
import { router } from './router'
import gql from 'graphql-tag'

// my graphql query
import { CREATE_USER_MUTATION } from './constants/UsersCreate.gql'
import { ALL_USER_QUERY } from './constants/UsersAll.gql'

export const Bus = new Vue();

Bus.$on('createUser', payload => {
    let { email, password, name, company, isAdmin, softDelete } = payload;

    apolloClient.mutate({
        mutation: CREATE_USER_MUTATION,
        variables: {
            email,
            password,
            name,
            company,
            isAdmin,
            softDelete
        },
        refetchQueries: [
            {
                query: ALL_USER_QUERY,
            }
        ]
    });
})