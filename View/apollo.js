import Vue from 'vue'
import ApolloClient from 'apollo-client'
import { HttpLink, InMemoryCache } from 'apollo-client-preset'
import VueApollo from 'vue-apollo'
import fetch from 'node-fetch';

// Create the apollo client
const apolloClient = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:3000/graphql' }, fetch),
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})

export default apolloProvider