import Vue from 'vue'
import Vuex from 'vuex'
import { getters } from './getters.js'
import { mutations } from './mutations.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        lastAddedId: null,

        // For user 
        userId: '',

        // For event creation
        eventJurys: [],
        eventStudents: [],
        eventProjects: [],

        // For meeting creation
        meetingProjects: [],

        modalItem: null,

        // For feedback
        feedbackItem: null,

        // Data isLoading
        isLoading: false,
    },
    getters,
    mutations,
})