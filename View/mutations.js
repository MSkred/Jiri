import { concat } from "async";

export const mutations = {
    getUserId(state, id){
        state.userId = id;
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
    setFeedback(state, payload){
        state.feedbackItem = payload;
        state.showSpecialAlert = true;
    },
    appIsLoading(state){
        state.isLoading = true;
    },
    appIsDone(state){
        state.isLoading = false;
    }
}