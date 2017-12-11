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
    allStudents(state, key) {
        state.students = key;
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
        state.jurys[key].event = false;
        if (state.jurys[key].event == false) {
            state.jurys.push(state.eventJurys[key])
            state.eventJurys.splice(key, 1)
        }
        return state.jurys
    },
    addStudent(state, key) {
        state.eventStudents.push(state.students[key])
        return state.eventStudents
    },
    removeStudent(state, key) {
        state.students.splice(key, 1);
        return state.jurys
    }
}