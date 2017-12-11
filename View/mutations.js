export const mutations = {
    jurys(state, key){
        state.jurys = key;
        var newJury = [];
        state.jurys.forEach((jury) => {
            var eventJurys = Object.assign({event: false}, jury);
            newJury.push(eventJurys);
        });
        state.jurys = newJury;
        return state.jurys;
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
    addJury(state, key){
        state.jurys[key].event = true;

        if (state.jurys[key].event == true) {
            state.eventJurys.push(state.jurys[key])    
            state.jurys.splice(key, 1)
        }
        return state.eventJurys
    },
    removeJury(state, key) {
        state.eventJurys[key].event = false;
        if (state.eventJurys[key].event == false) {
            state.jurys.push(state.eventJurys[key])
            state.eventJurys.splice(key, 1)
        }
        return state.jurys
    },
    addStudent(state, key) {
        state.students[key].event = true;

        if (state.students[key].event == true) {
            state.eventStudents.push(state.students[key])
            state.students.splice(key, 1)
        }
        return state.eventStudents
    },
    removeStudent(state, key) {
        state.eventStudents[key].event = false;
        if (state.eventStudents[key].event == false) {
            state.students.push(state.eventStudents[key])
            state.eventStudents.splice(key, 1)
        }
        return state.students
    }
}