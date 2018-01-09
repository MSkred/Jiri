import Vue from 'vue'
import ApolloClient from 'apollo-client'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
import { HttpLink, InMemoryCache } from 'apollo-client-preset'
import { getOperationAST } from 'graphql'
import { WebSocketLink } from 'apollo-link-ws'
import { ApolloLink } from 'apollo-link'
import VueApollo from 'vue-apollo'


const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
    });
    return forward(operation);
});

const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjazgfjex0fer0113x18k2m4z' });


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
