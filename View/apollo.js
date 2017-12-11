import Vue from 'vue'
import ApolloClient from 'apollo-client'
import { HttpLink, InMemoryCache } from 'apollo-client-preset'
import VueApollo from 'vue-apollo'
import fetch from 'node-fetch';

// Create the apollo client
const apolloClient = new ApolloClient({
    link: new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjazgfjex0fer0113x18k2m4z' }, fetch),
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})

export default apolloProvider