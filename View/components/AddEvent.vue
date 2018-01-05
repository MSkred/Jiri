<template>
  <div>
      <div class="container">
        <h1>Ajouter un événement</h1>
        <form-wizard 
            :title="null" 
            :subtitle="null" 
            :finishButtonText="`Créez l'événement`"
            :nextButtonText="`Suivant`"
            :backButtonText="`Précédent`"
            :color="`#3273dc`"
            @on-complete="createEvent">
            <tab-content title="Nom & année">
                <ui-textbox v-model="courseName" name="courseName" id="courseName"
                    label="Nom de l'événement"
                    data-vv-as="Le champs nom de l'événement" 
                    data-vv-validate-on="blur"
                    v-validate="'required|alpha_spaces|min:5'" 
                    :class="{'is-danger': errors.has('courseName') }"
                ></ui-textbox>
                <span v-show="errors.has('courseName')" class="help is-danger">{{ errors.first('courseName') }}</span>

                <ui-select v-model="academicYear" name="academicYear" id="academicYear"
                    label="L'année académique"
                    placeholder="Sélectionnez l'année académique"
                    :options="yearsStrings"
                ></ui-select>
                <span v-show="!academicYear" class="help is-danger">Le champs année académique est obligatoire</span>
            </tab-content>
            <tab-content title="Ajout des jurys">
                    <div>
                        <label for="jury">Ajoutez des membres du jury</label>
                        <ui-switch
                            v-for="(jury, key) in jurys" :value="jury.id" :key="jury.id"
                            @change="addJury(key)"
                        >{{jury.name}}</ui-switch>
                    </div>
                    <div>
                        <label for="jury">Membres du jury</label>
                        <ui-switch
                            v-for="(jury, key) in eventJurys" :value="jury.id" :key="jury.id"
                            checked= 'true'
                            @change="removeJury(key)"
                        >{{jury.name}}</ui-switch>
                    </div>
            </tab-content>
            <tab-content title="Ajout des étudiants">
                    <div>
                        <label for="jury">Ajoutez des étudiants</label>
                        <ui-switch
                            v-for="(student, key) in students" :value="student.id" :key="student.id"
                            @change="addStudent(key)"
                        >{{student.name}}</ui-switch>
                    </div>
                    <div v-if="eventStudents >= [0]">
                        <label for="jury">Étudiant(es) ajouté à l'événement</label>
                        <ui-switch
                            v-for="(student, key) in eventStudents" :value="student.id" :key="student.id"
                            checked= 'true'
                            @change="removeStudent(key)"
                        >{{student.name}}</ui-switch>
                    </div>
            </tab-content>
            <tab-content title="Ajout des projets">
                    <label for="jury">Sélectionnez les projets</label>
                    <template v-for="(project, key) in projects">
                        <!--Add project -->
                        <ui-switch 
                            :value="project.id" :key="project.id"
                            v-if="!project.event"
                            @change="addProject(key)"
                            v-model="project.event"
                        >{{project.name}}</ui-switch>

                        <!--Remove project -->
                        <ui-switch 
                            :value="project.id" :key="project.id"
                            v-if="project.event"
                            @change="removeProject(key)"
                            v-model="project.event"
                        >{{project.name}}</ui-switch>
                    </template>
            </tab-content>
            <tab-content title="Validation des informations">
                <div class="form-group">
                            <li>
                                Nom: {{courseName}}
                            </li>
                            <li>
                                Année: {{academicYear}}
                            </li>
                            <ul>Jurys:
                                <li v-for="(jury, key) in eventJurys">
                                    {{jury.name}}
                                </li>
                                <li v-if="eventJurys <= [0]">Pas de jurys</li>
                            </ul>
                            <ul>Étudiants:
                                <li v-for="(student, key) in eventStudents">
                                    {{student.name}}
                                </li>
                                <li v-if="eventStudents <= [0]">Pas d'étudiants</li>
                            </ul>
                            <ul>Projects:
                                <li v-for="(projet, key) in eventProjects">
                                    {{projet.name}}
                                </li>
                                <li v-if="eventProjects <= [0]">Pas de projets</li>
                            </ul>
                        </div>
            </tab-content>
        </form-wizard>
      </div>
  </div>
</template>

<script>
//import nanoid from 'nanoid'
//var _ = require('lodash');
import {mapGetters, mapMutations} from 'vuex'
import {Bus} from '../Bus'

import { store } from '../store'

import { ALL_USER_QUERY } from '../constants/UsersAll.gql'
import { ALL_STUDENT_QUERY } from '../constants/StudentsAll.gql'
import { ALL_PROJECT_QUERY } from '../constants/ProjectsAll.gql'


import {FormWizard, TabContent} from 'vue-form-wizard'
import { UiAlert, UiTextbox, UiSelect, UiSwitch } from 'keen-ui';
export default {
    name: 'add-event',
    components: {
        FormWizard,
        TabContent,
        UiAlert,
        UiTextbox,
        UiSelect,
        UiSwitch
    },
    data(){
        return{
            courseName: null,
            academicYear: null,
            softDelete: false,       
            authorId: null,
            currentEvent:  null,
            eventDatas: [],
            jurysIds: [],
            studentsIds: [],
            projectsIds: [],
            implementationsIds: [],

            jurys: [],
            students: [],
            projects: [],
            yearsStrings: [
                '2017 - 2018',
                '2018 - 2019',
                '2019 - 2020',
                '2020 - 2021',
                '2021 - 2022',
            ],
        }
    },
    apollo: {
        jurys: {
            query: ALL_USER_QUERY,
            update(data){
                var newJury = [];
                data.allUsers.map( jury => {
                    let id = jury.id
                    let name = jury.name
                    newJury.push( {id: id, name: name, event: false} )
                } )
                return newJury
            }
        },
        students: {
            query: ALL_STUDENT_QUERY,
            update(data){
                var newStudents = [];
                data.allStudents.map( student => {
                    let id = student.id
                    let name = student.name
                    newStudents.push( {id: id, name: name, event: false} )
                } )
                return newStudents
            }
        },
        projects: {
            query: ALL_PROJECT_QUERY,
            update(data){
                var newProjects = [];
                data.allProjects.map( project => {
                    let id = project.id
                    let name = project.name
                    newProjects.push( {id: id, name: name, event: false} )
                } )
                return newProjects
            }
        },
    },
    computed:{
        ...mapGetters([
            'eventJurys',
            'eventStudents',
            'eventProjects',
            'userId'
        ]),
    },
    methods: {
        // Name of the function of vue-form-wizard
        createEvent() {
            // Push ID on project in new array
            this.eventProjects.map( project => {
                let projectId = project.id;
                this.projectsIds.push(projectId)
            } )

            // Push ID on student in new array
            this.eventStudents.map( student => {
                let studentId = student.id;
                this.studentsIds.push(studentId)
            } )

            // Push ID on project in new array
            this.eventJurys.map( jury => {
                let juryId = jury.id;
                this.jurysIds.push(juryId)
            } )

            // Defined author id
            this.authorId = this.userId;

            let { courseName, academicYear, softDelete, authorId, jurysIds, studentsIds, projectsIds } = this;
            Bus.$emit('createEvent', { courseName, academicYear, softDelete, authorId, jurysIds, studentsIds, projectsIds });
            
            this.$router.push({name: 'events'})
        },

        // Add & Remove Jurys
        addJury(key){
            let eventJurys = store.state.eventJurys;
            this.jurys[key].event = true;

            if (this.jurys[key].event == true) {
                eventJurys.push(this.jurys[key])    
                this.jurys.splice(key, 1)
            }
        },
        removeJury(key) {
            let eventJurys = store.state.eventJurys;

            eventJurys[key].event = false;
            if (eventJurys[key].event == false) {
                this.jurys.push(eventJurys[key])
                eventJurys.splice(key, 1)
            }
        },

        // Add & Remove Students
        addStudent(key){
            let eventStudents = store.state.eventStudents;
            this.students[key].event = true;

            if (this.students[key].event == true) {
                eventStudents.push(this.students[key])    
                this.students.splice(key, 1)
            }
        },
        removeStudent(key) {
            let eventStudents = store.state.eventStudents;

            eventStudents[key].event = false;
            if (eventStudents[key].event == false) {
                this.students.push(eventStudents[key])
                eventStudents.splice(key, 1)
            }
        },

        // Add & Remove Projects
        addProject(key){
            let eventProjects = store.state.eventProjects;

            if(!this.projects[key].event){
                this.projects[key].event = true;
                eventProjects.push(this.projects[key]);
            }
        },
        removeProject(key) {
            let eventProjects = store.state.eventProjects;

            if (this.projects[key].event) {
                this.projects[key].event = false;
            }
            var i = 0;
            eventProjects.forEach(project => {
                if(!project.event){
                    eventProjects.splice(i, 1)
                }
                i++;
            });
        },
    }
};
</script>


