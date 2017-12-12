import Vue from 'vue'
import Vuex from 'vuex'
import { getters } from './getters.js'
import { mutations } from './mutations.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        authorId: "cjazgxq0mo64601002c9kc42z",
        jurys: [],
        students: [],
        projects: [],
        eventJurys: [],
        eventStudents: [],
        eventProjects: [],
    },
    getters,
    mutations,
})