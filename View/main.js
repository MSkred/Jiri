import Vue from 'vue'
import {store} from './store'
import VueRouter from 'vue-router'
import Routes from './routes'
import ApolloClient from 'apollo-client'
import { HttpLink, InMemoryCache } from 'apollo-client-preset'
import VueApollo from 'vue-apollo'
import fetch from 'node-fetch'

import apolloProvider from './apollo'

import App from './App.vue'
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