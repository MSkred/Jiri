import { concat } from "async";

export const mutations = {
    jurys(state, payload){
        state.jurys = payload;
        var newJury = [];
        state.jurys.map( jury => {
            let id = jury.id
            let name = jury.name
            newJury.push( {id: id, name: name, event: false} )
        } )
        state.jurys = newJury;
    },
    users(state, payload) {
        state.users = payload;
    },
    user(state, payload) {
        state.user = payload;
    },
    students(state, payload) {
        state.students = payload;
        var newStudent = [];
        state.students.map(student => {
            let id = student.id
            let name = student.name
            newStudent.push({ id: id, name: name, event: false })
        })
        state.students = newStudent;
    },
    student(state, payload) {
        state.student = payload;
    },
    allStudents(state, payload) {
        state.allStudents = payload;
    },
    projects(state, payload) {
        state.projects = payload;
        var newProject = [];
        state.projects.map(project => {
            let id = project.id
            let name = project.name
            newProject.push({ id: id, name: name, event: false })
        })
        state.projects = newProject;
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
    addJury(state, key){
        state.jurys[key].event = true;

        if (state.jurys[key].event == true) {
            state.eventJurys.push(state.jurys[key])    
            state.jurys.splice(key, 1)
        }
    },
    removeJury(state, key) {
        state.eventJurys[key].event = false;
        if (state.eventJurys[key].event == false) {
            state.jurys.push(state.eventJurys[key])
            state.eventJurys.splice(key, 1)
        }
    },
    addStudent(state, key) {
        state.students[key].event = true;

        if (state.students[key].event == true) {
            state.eventStudents.push(state.students[key])
            state.students.splice(key, 1)
        }
    },
    addProject(state, key){
        if(!state.projects[key].event){
            state.projects[key].event = true;
            state.eventProjects.push(state.projects[key]);
        }
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
    removeProject(state, key){
        if (state.projects[key].event) {
            state.projects[key].event = false;
        }
        var i = 0;
        state.eventProjects.forEach(project => {
            if(!project.event){
                state.eventProjects.splice(i, 1)
            }
            i++;
        });
    },
    removeStudent(state, key) {
        state.eventStudents[key].event = false;
        if (state.eventStudents[key].event == false) {
            state.students.push(state.eventStudents[key])
            state.eventStudents.splice(key, 1)
        }
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
    }
    
}