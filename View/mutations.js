import { concat } from "async";

export const mutations = {
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