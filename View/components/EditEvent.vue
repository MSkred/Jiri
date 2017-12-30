<template>
  <div>
      <div class="container">
      <h1>Ajouter un événement</h1>
      
<form id="msform">
    <ul id="progressbar">
        <li class="active">Nom & année</li>
        <li>Ajout du jury</li>
        <li>Ajout des étudiants</li>
        <li>Ajout des projets</li>
        <li>Validation des informations</li>
    </ul>
    <fieldset>
        <h2 class="fs-title">Écrivez le nom et l'année de l'événement</h2>
        <h3 class="fs-subtitle">Ceci est l'étape 1</h3>
        <input v-model="courseName" type="text" id="courseName" name="courseName" placeholder="Écrivez le nom" class="form-control">
        <label for="academicYear">Sélectionnez l'année académique</label>
        <select v-model="academicYear" name="academicYear" id="academicYear" class="form-control">
            <option value="2017">2017 - 2018</option>
            <option value="2018">2018 - 2019</option>
            <option value="2019">2019 - 2020</option>
            <option value="2020">2020 - 2021</option>
            <option value="2021">2021 - 2022</option>
        </select>
        <input type="button" name="next" class="next action-button" value="Étape suivante" />
    </fieldset>
    <fieldset>
        <h2 class="fs-title">Ajoutez les membres du jury</h2>
        <h3 class="fs-subtitle">Ceci est l'étape 2</h3>
        <div>
            <label for="jury">Ajoutez des membres du jury</label>
            <ul>
                <li v-if="!jury.event" v-for="(jury, key) in jurys" :value="jury.id" :key="jury.id">
                    {{jury.name}}
                    <button class="btn btn-primary" v-on:click.prevent="addJury(key)">+</button>
                </li>
            </ul>
        </div>
        <div v-if="eventJurys">
            <label for="jury">Membres du jury</label>
            <ul>
                <li v-for="(jury, key) in eventJurys" :value="jury.id" :key="jury.id">
                    {{jury.name}}
                    <button class="btn btn-danger" v-on:click.prevent="removeJury(key)">-</button>
                </li>
            </ul>
        </div>
        <input type="button" name="previous" class="previous action-button" value="Previous" />
        <input type="button" name="next" class="next action-button" value="Next" />
    </fieldset>
    <fieldset>
        <h2 class="fs-title">Ajoutez les étudiants</h2>
        <h3 class="fs-subtitle">Ceci est l'étape 3</h3>
        <div>
            <label for="jury">Ajoutez des étudiants</label>
            <ul>
                <li v-if="!student.event" v-for="(student, key) in students" :value="student.id" :key="student.id">
                    {{student.name}}
                    <button type="submit" class="btn btn-primary" v-on:click.prevent="addStudent(key)">+</button>
                </li>
            </ul>
        </div>
        <div v-if="eventStudents >= [0]">
            <label for="jury">Étudiant(es) ajouté à l'événement</label>
            <ul>
                <li v-for="(student, key) in eventStudents" :value="student.id" :key="student.id">
                    {{student.name}}
                    <button type="submit" class="btn btn-danger" v-on:click.prevent="removeStudent(key)">-</button>
                </li>
            </ul>
        </div>
        <input type="button" name="previous" class="previous action-button" value="Previous" />
        <input type="button" name="next" class="next action-button" value="Next" />
    </fieldset>
    <fieldset>
        <h2 class="fs-title">Ajoutez les projets</h2>
        <h3 class="fs-subtitle">Ceci est l'étape 4</h3>
        <label for="project">Sélectionnez les projets</label>
        <label v-for="(project, key) in projects" :value="project.id" :key="project.id" class="form-check">
            <!--Add project -->
            <input v-if="!project.event" v-model="project.event" @click.prevent="addProject(key)" type="checkbox" class="form-check-input"></input>
        
            <!--Delete project -->
            <input v-if="project.event" v-model="project.event" @click.prevent="removeProject(key)" type="checkbox" class="form-check-input">{{project.name}}</input>
        </label>
        <input type="button" name="previous" class="previous action-button" value="Previous" />
        <input type="button" name="next" class="next action-button" value="Next" />
    </fieldset>
    <fieldset>
        <h2 class="fs-title">Validez les informations de l'événement</h2>
        <h3 class="fs-subtitle">Ceci est la dernières étape</h3>
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
        <input type="button" name="previous" class="previous action-button" value="Previous" />
        <input type="submit" name="submit" class="submit action-button" @click.prevent="updateEvent" value="Sauvegarder l'événement" />
    </fieldset>
</form>
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

var _ = require('lodash');
export default {
  name: 'edit-event',
    props: ['id'],
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
            //let eventProjects = store.state.eventProjects;

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
                    //var i = 0;
                }
                i++;
            });
        },
    }
};
</script>
