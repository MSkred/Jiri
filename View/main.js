import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import fetch from 'node-fetch';
import ApolloClient from 'apollo-client'
import { HttpLink, InMemoryCache } from 'apollo-client-preset'
import VueApollo from 'vue-apollo'

// Create the apollo client
const apolloClient = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:3000/graphql', fetch }),
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})

new Vue({
    el: '#app',
    apolloProvider,
    render: h => h(App),
})