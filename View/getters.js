export const getters = {
    jurys(state){
        return state.jurys;
    },
    students(state) {
        return state.students;
    },
    projects(state) {
        return state.projects;
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
}