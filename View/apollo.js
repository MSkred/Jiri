import Vue from 'vue'
import ApolloClient from 'apollo-client'
import { HttpLink, InMemoryCache } from 'apollo-client-preset'
import VueApollo from 'vue-apollo'
import fetch from 'node-fetch';



// Create the apollo client
const apolloClient = new ApolloClient({
    link: new HttpLink({ uri: 'http://127.0.0.1:3000/graphql' }),
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})

export default apolloProvider