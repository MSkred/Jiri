import { concat } from "async";

export const mutations = {
    user(state, payload) {
        state.user = payload;
    },
    events(state, payload){
        state.events = payload;
    },
    event(state, payload){
        // Fill state event with payload
        state.event = payload;
    },
    meeting(state, payload){
        state.meeting = payload;
        // Create projects & newEvent array
        var implementations = [];
        var newMeeting = [];
        var newEvent = new Object();
        // Get all data in var
        var id = state.meeting.id
        var student = state.meeting.student
        var event = state.meeting.event
        // Adding meeting key in my object
        event.implementations.map( implementation => {
            let id = implementation.id
            let project = implementation.project
            implementations.push({ id: id, project: project, meeting: false, score: { comment: null, score: null } })
        } )
        newEvent = ({ id: id, implementations: implementations})
        // Reset state
        state.meeting = new Object();
        // Create new state with projects meeting key
        state.meeting = ({ id, student, event: newEvent })
    },
    meetingStudent(state, payload) {
        state.meetingStudent = payload;
    },
    addProjectToMeeting(state, key) {
        if (!state.meeting.event.implementations[key].meeting) {
            state.meeting.event.implementations[key].meeting = true;
            state.meetingProjects.push(state.meeting.event.implementations[key]);
        }
    },
    removeProjectToMeeting(state, key) {
        if (state.meeting.event.implementations[key].meeting) {
            state.meeting.event.implementations[key].meeting = false;
        }
        var i = 0;
        state.meeting.event.implementations.forEach(implementation => {
            if (!implementation.meeting) {
                state.meetingProjects.splice(i, 1)
            }
            i++;
        });
    },
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