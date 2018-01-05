import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import {apolloProvider} from './apollo'
import { store } from './store'

// Import french errors messages
import fr from 'vee-validate/dist/locale/fr';

// Import VeeValidate modul
import VeeValidate, { Validator } from 'vee-validate';
import App from './App.vue'

// Import KeenUI
import KeenUI from 'keen-ui';
import 'keen-ui/dist/keen-ui.css';


// Merge the locales.
Validator.localize('fr', fr);

// Use this
Vue.use(VeeValidate, KeenUI)


new Vue({
    el: '#app',
    store,
    apolloProvider,
    render: h => h(App),
    router,
})