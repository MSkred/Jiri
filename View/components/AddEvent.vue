<template>
  <div>
      <div class="wrapper">
        <section class="hero is-link">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Ajouter un événement
                    </h1>
                </div>
            </div>
        </section>
        <h1></h1>
        <ui-alert @dismiss="showAlert = false" v-if="this.feedbackItem" v-show="showAlert" :type="this.feedbackItem.type">
            {{this.feedbackItem.message}}
        </ui-alert>
        <form-wizard 
            :title="null" 
            :subtitle="null" 
            :finishButtonText="`Créez l'événement`"
            :nextButtonText="`Suivant`"
            :backButtonText="`Précédent`"
            :color="`#3273dc`"
            @on-complete="validateBeforeSubmit">
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
            academicYear: '2017 - 2018',
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
            showAlert: false,
            feedback: null,
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
            'userId',
            'feedbackItem'
        ]),
    },
    methods: {
        ...mapMutations([
            'setFeedback',
        ]),
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
        validateBeforeSubmit() {
            this.$validator.validateAll().then((result) => {
                if (result) {

                    // Create Event
                    this.createEvent();
                    
                    // Create feedback
                    this.feedback = {
                        type: 'success',
                        message: `L'événement ${this.courseName} a bien été créé`,
                    }

                    // Set feedback
                    this.setFeedback(this.feedback);

                    // Reset data for emptied field
                    Object.assign(this.$data, this.$options.data.apply(this))
                    
                    return this.showAlert = true;
                }else{
                    // Create feedback
                    this.feedback = {
                        type: 'error',
                        message: `L'événement ${this.courseName} n'a pas été créé car il y a des erreurs. Veuillez les corrigez et réessayer`
                    }

                    // Set feedback
                    this.setFeedback(this.feedback);
                    
                    return this.showAlert = true;
                }
            });
        },

        // Add & Remove Students
            addStudent(key){
                let eventStudents = store.state.eventStudents;

                if(this.students[key].event){
                    eventStudents.push(this.students[key]);
                }
            },
            removeStudent(key) {
                let eventStudents = store.state.eventStudents;

                var i = 0;
                eventStudents.forEach(student => {
                    if(!student.event){
                        eventStudents.splice(i, 1)
                    }
                    i++;
                });
            },

        // Add & Remove Projects
            addProject(key){
                let eventProjects = store.state.eventProjects;

                if(this.projects[key].event){
                    eventProjects.push(this.projects[key]);
                }
            },
            removeProject(key) {
                let eventProjects = store.state.eventProjects;

                var i = 0;
                eventProjects.forEach(project => {
                    if(!project.event){
                        eventProjects.splice(i, 1)
                    }
                    i++;
                });
            },

        // Add & Remove Jury
            addJury(key){
                let eventJurys = store.state.eventJurys;

                if(this.jurys[key].event){
                    eventJurys.push(this.jurys[key]);
                }
            },
            removeJury(key) {
                let eventJurys = store.state.eventJurys;
                
                var i = 0;
                eventJurys.forEach(jury => {
                    if(!jury.event){
                        eventJurys.splice(i, 1)
                    }
                    i++;
                });
            },
    }
};
</script>
