import Vue from 'vue'
import {store} from './store'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes'
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

// Init router
Vue.use(VueRouter)

const router = new VueRouter({
    routes: Routes
})

new Vue({
    el: '#app',
    store,
    apolloProvider,
    render: h => h(App),
    router,
})