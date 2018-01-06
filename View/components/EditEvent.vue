<template>
  <div>
      <div class="container">
        <h1>Modification d'un événement</h1>
        <form-wizard 
            :title="null" 
            :subtitle="null" 
            :finishButtonText="`Sauvegarder les`"
            :nextButtonText="`Suivant`"
            :backButtonText="`Précédent`"
            :color="`#3273dc`"
            @on-complete="updateEvent">
            <tab-content title="Nom & année">
                <ui-textbox v-model="courseName" name="courseName" id="courseName"
                    label="Nom de l'événement"
                    data-vv-as="Le champs nom de l'événement" 
                    data-vv-validate-on="blur"
                    v-validate="'required|alpha_spaces|min:5'" 
                    :class="{'is-danger': errors.has('courseName') }"
                ></ui-textbox>
                <span v-show="errors.has('courseName')" class="help is-danger">{{ errors.first('courseName') }}</span>

                <ui-select v-model="academicYear"
                    label="L'année académique"
                    placeholder="Sélectionnez l'année académique"
                    :options="yearsStrings"
                ></ui-select>
            </tab-content>
            <tab-content title="Ajout des jurys">
                    <label for="jury">Sélectionnez les projets</label>
                    <template v-for="(jury, key) in jurys">
                        <!--Add jury -->
                        <ui-switch 
                            :value="jury.id" :key="jury.id"
                            v-if="!jury.event"
                            @change="addJury(key)"
                            v-model="jury.event"
                        >{{jury.name}}</ui-switch>

                        <!--Remove jury -->
                        <ui-switch 
                            :value="jury.id" :key="jury.id"
                            v-if="jury.event"
                            @change="removeJury(key)"
                            v-model="jury.event"
                        >{{jury.name}}</ui-switch>
                    </template>
            </tab-content>
            <tab-content title="Ajout des étudiants">
                    <label for="jury">Sélectionnez les étudiants</label>
                    <template v-for="(student, key) in students">
                        <!--Add student -->
                        <ui-switch 
                            :value="student.id" :key="student.id"
                            v-if="!student.event"
                            @change="addStudent(key)"
                            v-model="student.event"
                        >{{student.name}}</ui-switch>

                        <!--Remove student -->
                        <ui-switch 
                            :value="student.id" :key="student.id"
                            v-if="student.event"
                            @change="removeStudent(key)"
                            v-model="student.event"
                        >{{student.name}}</ui-switch>
                    </template>
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
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {Bus} from '../Bus'

import { store } from '../store'

import { ALL_USER_QUERY } from '../constants/UsersAll.gql'
import { ALL_STUDENT_QUERY } from '../constants/StudentsAll.gql'
import { ALL_PROJECT_QUERY } from '../constants/ProjectsAll.gql'
import { SINGLE_EVENT_QUERY } from '../constants/Event.gql'


import {FormWizard, TabContent} from 'vue-form-wizard'
import { UiAlert, UiTextbox, UiSelect, UiSwitch } from 'keen-ui';
var _ = require('lodash');
export default {
    name: 'edit-event',
    props: ['id'],
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

        jurysIds: [],
        studentsIds: [],
        projectsIds: [],
        implementationsIds: [],

        jurys: [],
        students: [],
        projects: [],

        editableEvent: '',
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
        editableEvent: {
            query: SINGLE_EVENT_QUERY,
            variables() {
                // Use vue reactive properties
                return {
                    id: this.id,
                }
            },
            update(data){
            
                // // Put courseName & academicYear in data  
                this.courseName = data.allEvents[0].courseName
                this.academicYear = data.allEvents[0].academicYear

                // // Put eventStudents in data  
                data.allEvents[0].students.map(student => {
                    let id = student.id,
                        name = student.name;

                    this.eventStudents.push( {id: id, name: name, event: true} )
                });
                // Check two array, event = true
                // if ID coresponding
                this.eventStudents.map(eStudent => {
                    this.students.map(student => {
                        if(student.id === eStudent.id){
                            student.event = true;
                        }
                    })
                })


                // // Put eventJurys in data  
                data.allEvents[0].jurys.map(jury => {
                    let id = jury.id,
                        name = jury.name;

                    this.eventJurys.push( {id: id, name: name, event: true} )
                });
                // Check two array, event = true
                // if ID coresponding
                this.eventJurys.map(eJury => {
                    this.jurys.map(jury => {
                        if(jury.id === eJury.id){
                            jury.event = true;
                        }
                    })
                })


                // // Put eventProjects in data  
                data.allEvents[0].projects.map(project => {
                    let id = project.id,
                        name = project.name;

                    this.eventProjects.push( {id: id, name: name, event: true} )
                });
                // Check two array, event = true
                // if ID coresponding
                this.eventProjects.map(eProject => {
                    this.projects.map(project => {
                        if(project.id === eProject.id){
                            project.event = true;
                        }
                    })
                })


               //return data.allEvents[0]
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
        updateEvent() {

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

            let id = this.id; 

            let { courseName, academicYear, jurysIds, studentsIds, projectsIds } = this;
            Bus.$emit('updateEvent', { id, courseName, academicYear, jurysIds, studentsIds, projectsIds });

            this.$router.push({name: 'events'})

        },

        // Add & Remove Jurys
            addJury(key){
                let eventJurys = store.state.eventJurys;

                if(this.jurys[key].event){
                    this.eventJurys.push(this.jurys[key]);
                }
            },
            removeJury(key) {
                if (this.jurys[key].event) {
                    this.jurys[key].event = false;
                }
                var i = 0;
                this.eventJurys.forEach(jury => {
                    if(jury.id === this.jurys[key].id){
                        jury.event = false;
                    }
                    
                    if(!jury.event){
                        this.eventJurys.splice(i, 1)
                    }
                    i++;
                });
            },

        // Add & Remove Students
            addStudent(key){
                let eventStudents = store.state.eventStudents;

                if(this.students[key].event){
                    this.eventStudents.push(this.students[key]);
                }
            },
            removeStudent(key) {
                if (this.students[key].event) {
                    this.students[key].event = false;
                }
                var i = 0;
                this.eventStudents.forEach(student => {
                    if(student.id === this.students[key].id){
                        student.event = false;
                    }
                    
                    if(!student.event){
                        this.eventStudents.splice(i, 1)
                    }
                    i++;
                });
            },

        // Add & Remove Projects
            addProject(key){
                let eventProjects = store.state.eventProjects;

                if(this.projects[key].event){
                    this.eventProjects.push(this.projects[key]);
                }
            },
            removeProject(key) {

                if (this.projects[key].event) {
                    this.projects[key].event = false;
                }
                var i = 0;
                this.eventProjects.forEach(project => {
                    if(project.id === this.projects[key].id){
                        project.event = false;
                    }
                    
                    if(!project.event){
                        this.eventProjects.splice(i, 1)
                    }
                    i++;
                });
            },
    }
};
</script>
