import { concat } from "async";

export const mutations = {
    getUserId(state, id){
        state.userId = id;
    },
    getUserData(state, payload){
        state.userData = payload
    },
    setDesactivateData(state, payload) {
        state.modalItem = payload;
    },
    setModifyData(state, payload) {
        state.modalItem = payload;
    },
    lastAddedId(state, payload) {
        state.lastAddedId = payload;
    },
    
}