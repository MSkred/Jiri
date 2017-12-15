import Vue from 'vue'
import ApolloClient from 'apollo-client'
import { HttpLink, InMemoryCache } from 'apollo-client-preset'
import { ApolloLink } from 'apollo-link'
import VueApollo from 'vue-apollo'
import fetch from 'node-fetch'


const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjazgfjex0fer0113x18k2m4z' });

const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            authorization: `Bearer ${localStorage.getItem('graphcoolToken')}`
        }
    });
    return forward(operation);
});



// Create the apollo client
export const apolloClient = new ApolloClient({
    link: middlewareLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

Vue.use(VueApollo)

export const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})

