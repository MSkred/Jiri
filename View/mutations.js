export const mutations = {
    jurys(state, key){
        state.jurys = key;
        var newJury = [];
        state.jurys.forEach((jury) => {
            var eventJurys = Object.assign({event: false}, jury);
            newJury.push(eventJurys);
        });
        state.jurys = newJury;
    },
    students(state, key) {
        state.students = key;
        var newStudent = [];
        state.students.forEach((student) => {
            var eventStudent = Object.assign({ event: false }, student);
            newStudent.push(eventStudent);
        });
        state.students = newStudent;
        return state.students;
    },
    projects(state, key) {
        state.projects = key;
        var newProject = [];
        state.projects.forEach((project) => {
            var eventProject = Object.assign({ event: false }, project);
            newProject.push(eventProject);
        });
        state.projects = newProject;
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
    
}