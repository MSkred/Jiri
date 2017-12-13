import Vue from 'vue'
import VueRouter from 'vue-router'
import Routes from './routes'
import apolloProvider from './apollo'
import App from './App.vue'
import { store } from './store'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: Routes
})
router.beforeEach( (to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if(!localStorage.getItem('graphcoolToken')){
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath,
                },
            });
        }else{
            next();
        }
    }else{
        next();
    }
} )

new Vue({
    el: '#app',
    store,
    apolloProvider,
    render: h => h(App),
    router,
})