import Vue from 'vue'
import Vuex from 'vuex'
import { getters } from './getters.js'
import { mutations } from './mutations.js'
import { actions } from './actions.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        userId: null,
        currentUser: {},
        jurys: [],
        students: [],
        projects: [],
        eventJurys: [],
        eventStudents: [],
        eventProjects: [],
    },
    getters,
    mutations,
    actions,
})