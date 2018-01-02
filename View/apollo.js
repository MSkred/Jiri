import Vue from 'vue'
import ApolloClient from 'apollo-client'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
import { HttpLink, InMemoryCache } from 'apollo-client-preset'
import { getOperationAST } from 'graphql'
import { WebSocketLink } from 'apollo-link-ws'
import { ApolloLink } from 'apollo-link'
import VueApollo from 'vue-apollo'


const link = ApolloLink.split(
    (operation) => {
        const operationAST = getOperationAST(operation.query, operation.operationName);
        operation.setContext({
            headers: {
                authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        });
        return !!operationAST && operationAST.operation === 'subscription';
    },
    new SubscriptionClient('wss://subscriptions.graph.cool/v1/cjazgfjex0fer0113x18k2m4z', {
        reconnect: true,
        connectionParams: {
            authToken: localStorage.getItem('userToken')
        }
    }),
    new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjazgfjex0fer0113x18k2m4z' }),
);


// Create cache
const cache = new InMemoryCache();

// Init ApolloClient with link and cache
export const apolloClient = new ApolloClient({
    link,
    cache,
    connectToDevTools: true,
});

// Use apollo in Vue.js
Vue.use(VueApollo)

// Export client
export const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})