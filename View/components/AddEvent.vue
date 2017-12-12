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
import {mapGetters, mapMutations} from 'vuex'
// import VueApollo from 'vue-apollo'
 
import { ALL_USER_QUERY } from '../constants/UsersAll.gql'
import { ALL_STUDENT_QUERY } from '../constants/StudentsAll.gql'
import { ALL_PROJECT_QUERY } from '../constants/ProjectsAll.gql'
import { CREATE_EVENT_MUTATION } from '../constants/EventsCreate.gql'
var _ = require('lodash');
export default {
    name: 'add-event',
    data(){
        return{
            courseName: null,
            academicYear: null,
            softDelete: false,       
            authorId: "cjazgxq0mo64601002c9kc42z",
            jurysIds: [],
            studentsIds: [],
            projectsIds: [],
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
        ]),
    },
    methods: {
        createEvent(){
            
            // Push ID on project in new array
            var iP = 0;
            while (iP < this.$store.getters.eventProjects.length) {
                var project =_.toArray(this.$store.getters.eventProjects[iP]);
                var projectId = project[1];
                this.projectsIds.push(projectId);
                iP++;
            }
            // Push ID on student in new array
            var iS = 0;
            while (iS < this.$store.getters.eventStudents.length) {
                var student =_.toArray(this.$store.getters.eventStudents[iS]);
                var studentId = student[1];
                this.studentsIds.push(studentId);
                iS++;
            }
            // Push ID on project in new array
            var iJ = 0;
            while (iJ < this.$store.getters.eventJurys.length) {
                var jury =_.toArray(this.$store.getters.eventJurys[iJ]);
                var juryId = jury[1];
                this.jurysIds.push(juryId);
                iJ++;
            }
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
                    projectsIds,
                },
            }).then(data => {
                console.log('Done event creation.');
            }).catch(error => {
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
    },
    created(){
        
        const { name, id } = this;
        // Users query
        this.$apollo.query({
            query: ALL_USER_QUERY,
            variables: {
                name,
                id
            }
        }).then(data => {
            this.allUsers = data.data.allUsers
            this.$store.commit('jurys', this.allUsers, {root: true})
        }).catch(error => {
            console.log("---User recuperation failed " + error)
        });

        // Students query
        this.$apollo.query({
            query: ALL_STUDENT_QUERY,
            variables: {
                name,
                id
            }
        }).then(data => {
            this.allStudents = data.data.allStudents
            this.$store.commit('students', this.allStudents, {root: true})
        }).catch(error => {
            console.log("---User recuperation failed " + error)
        });

        // Projects query
        this.$apollo.query({
            query: ALL_PROJECT_QUERY,
            variables: {
                name,
                id
            }
        }).then(data => {
            this.allProjects = data.data.allProjects
            this.$store.commit('projects', this.allProjects, {root: true})
        }).catch(error => {
            console.log("---User recuperation failed " + error)
        });
        
    }
};
</script>