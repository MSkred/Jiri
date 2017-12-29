export const getters = {
    jurys(state){
        return state.jurys;
    },
    users(state) {
        return state.users;
    },
    user(state) {
        return state.user;
    },
    students(state) {
        return state.students;
    },
    student(state) {
        return state.student;
    },
    allStudents(state) {
        return state.allStudents;
    },
    projects(state) {
        return state.projects;
    },
    allProjects(state) {
        return state.allProjects;
    },
    events(state){
        return state.events;
    },
    event(state) {
        return state.event;
    },
    eventJurys(state) {
        return state.eventJurys;
    },
    eventStudents(state) {
        return state.eventStudents;
    },
    eventProjects(state) {
        return state.eventProjects;
    },
    meetingProjects(state){
        return state.meetingProjects;
    },
    meeting(state){
        return state.meeting
    },
    userId(state) {
        return state.userId;
    },
    userData(state) {
        return state.userData;
    },
    modalItem(state) {
        return state.modalItem;
    },
    lastAddedId(state) {
        return state.lastAddedId
    },
}