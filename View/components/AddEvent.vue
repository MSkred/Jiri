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
                <li v-for="(jury, key) in jurys" :value="jury.id" :key="jury.id">
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
                <li v-for="(student, key) in students" :value="student.id" :key="student.id">
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
        <input type="submit" name="submit" class="submit action-button" @click.prevent="createEvent" value="Créez l'événement" />
    </fieldset>
</form>
      </div>
  </div>
</template>

<script>


import nanoid from 'nanoid'
import {mapGetters, mapMutations, mapActions} from 'vuex'
// import VueApollo from 'vue-apollo'
 
import { CREATE_EVENT_MUTATION } from '../constants/EventsCreate.gql'
import { CREATE_IMPLEMENTATIONS_MUTATION } from '../constants/ImplementationsCreate.gql'
var _ = require('lodash');
export default {
    name: 'add-event',
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
        }
    },
    computed:{
        ...mapGetters([
            'jurys',
            'students',
            'projects',
            'eventJurys',
            'eventStudents',
            'eventProjects',
            'userId'
        ]),
    },
    methods: {
        createEvent(){
            
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

            // Create event
            const { courseName, academicYear, softDelete, authorId, jurysIds, studentsIds, projectsIds } = this;
            this.$apollo.mutate({
                mutation: CREATE_EVENT_MUTATION,
                variables: {
                    courseName,
                    academicYear,
                    softDelete,
                    authorId,
                    jurysIds,
                    studentsIds,
                },
            }).then(data => {
                this.currentEvent = data.data.createEvent.id
                console.log('Done event creation.');
            }).then(data => {
                // Create all implementations
                this.studentsIds.forEach(student => {
                    this.projectsIds.forEach(project => {
                        let studentId = student;
                        let projectId = project
                        let eventId = this.currentEvent;
                        let weight = 1/(projectsIds.length)
                        let softDelete = this.softDelete
                        console.log(studentId, projectId, eventId, weight, softDelete);
                        this.$apollo.mutate({
                            mutation: CREATE_IMPLEMENTATIONS_MUTATION,
                            variables: {
                                softDelete,
                                eventId,
                                projectId,
                                studentId,
                                weight,
                            }
                        }).then(data => {
                            console.log('Done implementation creation')
                        }).catch(error => {
                            console.log('---implementation creation failed'  + error)
                        });

                    });
                });
                this.studentsIds = [];
                this.projectsIds = [];
            }).then(data => {
                console.log('Done event update')
            })
            .catch(error => {
                console.log('---Event creation failed' + error)
            });


        },
        ...mapMutations([
            'addJury',
            'addStudent',
            'addProject',
            'removeStudent',
            'removeJury',
            'removeProject'
        ]),
        ...mapActions([
            'setAllUsers',
            'setAllStudents',
            'setAllProjects',
        ])
    },
    created(){

        // Users recuperation
        this.$store.dispatch('setAllUsers')

        // Students recuperation
        this.$store.dispatch('setAllStudents')

        // Projects recuperation
        this.$store.dispatch('setAllProjects')
        
    }
};
</script>