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

    // Display meeting project
    meetingProjects(state){
        return state.meetingProjects;
    },
    meeting(state){
        return state.meeting
    },

    // Get user data
    userId(state) {
        return state.userId;
    },
    userData(state) {
        return state.userData;
    },

    // ModalItem
    modalItem(state) {
        return state.modalItem;
    },

    // Last added ID
    lastAddedId(state) {
        return state.lastAddedId
    },
}