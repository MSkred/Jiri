import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import {apolloProvider} from './apollo'
import { store } from './store'


import fr from 'vee-validate/dist/locale/fr';
import VeeValidate, { Validator } from 'vee-validate';
import App from './App.vue'

// Merge the locales.
Validator.localize('fr', fr);

Vue.use(VeeValidate)


new Vue({
    el: '#app',
    store,
    apolloProvider,
    render: h => h(App),
    router,
})