export const getters = {
    // For event creation
    eventJurys(state) {
        return state.eventJurys;
    },
    eventStudents(state) {
        return state.eventStudents;
    },
    eventProjects(state) {
        return state.eventProjects;
    },
    
    // Get user data
    userId(state) {
        return state.userId;
    },

    // ModalItem
    modalItem(state) {
        return state.modalItem;
    },

    // Last added ID
    lastAddedId(state) {
        return state.lastAddedId
    },

    // FeedbackItem
    feedbackItem(state) {
        return state.feedbackItem;
    },
}