<template>
  <div>
      <div class="container">
      <h1>Ajouter un événement</h1>
            <div class="form-group">
                <label for="courseName">Nom de l'événement</label>
                <input v-model="courseName" type="text" id="courseName" name="courseName" placeholder="Écrivez le nom" class="form-control">
            </div>
            <div class="form-group">
                <label for="academicYear">Sélectionnez l'année académique</label>
                <select v-model="academicYear" name="academicYear" id="academicYear" class="form-control">
                    <option value="2017">2017 - 2018</option>
                    <option value="2018">2018 - 2019</option>
                    <option value="2019">2019 - 2020</option>
                    <option value="2020">2020 - 2021</option>
                    <option value="2021">2021 - 2022</option>
                </select>
            </div>
            <div class="form-group">
                <div>
                    <label for="jury">Ajoutez des membres du jury</label>
                    <ul>
                        <li v-for="(jury, key) in jurys" :value="jury.id" :key="jury.id">
                            {{jury.name}}
                            <button type="submit" class="btn btn-primary" v-on:click="addJury(key)">+</button>
                        </li>
                    </ul>
                </div>
                <div v-if="eventJurys">
                    <label for="jury">Membres du jury</label>
                    <ul>
                        <li v-for="(jury, key) in eventJurys" :value="jury.id" :key="jury.id">
                            {{jury.name}}
                            <button type="submit" class="btn btn-danger" v-on:click="removeJury(key)">-</button>
                        </li>
                    </ul>
                </div>
            </div> 
            <div class="form-group">
                <div>
                    <label for="jury">Ajoutez des étudiants</label>
                    <ul>
                        <li v-for="(student, key) in students" :value="student.id" :key="student.id">
                            {{student.name}}
                            <button type="submit" class="btn btn-primary" v-on:click="addStudent(key)">+</button>
                        </li>
                    </ul>
                </div>
                <div v-if="eventStudents >= [0]">
                    <label for="jury">Étudiant(es) ajouté à l'événement</label>
                    <ul>
                        <li v-for="(student, key) in eventStudents" :value="student.id" :key="student.id">
                            {{student.name}}
                            <button type="submit" class="btn btn-danger" v-on:click="removeStudent(key)">-</button>
                        </li>
                    </ul>
                </div>
            </div> 
            <div class="form-group">
                <label for="project">Sélectionnez les projets</label>
                <label v-for="(project, key) in projects" :value="project.id" :key="project.id" class="form-check">
                    <!--Add project -->
                    <input v-if="!project.event" v-model="project.event" @click="addProject(key)" type="checkbox" class="form-check-input"></input>
                    
                    <!--Delete project -->
                    <input v-if="project.event" v-model="project.event" @click="removeProject(key)" type="checkbox" class="form-check-input">{{project.name}}</input>
                </label>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary" @click="createEvent">Créer un événement</button>
            </div>
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
export default {
    name: 'add-event',
    data(){
        return{
            courseName: null,
            academicYear: null,
            softDelete: false,
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
            const { courseName, academicYear, softDelete, authorId, jurysIds } = this;
            this.$apollo.mutate({
                mutation: CREATE_EVENT_MUTATION,
                variables: {
                    courseName,
                    academicYear,
                    softDelete,
                    authorId,
                    jurysIds,
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