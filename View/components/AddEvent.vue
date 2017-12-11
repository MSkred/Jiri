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
                        <li v-for="(jury, key) in jurys" :value="jury.id" :id="key">
                            {{jury.name}}
                            <button type="submit" class="btn btn-primary" :id="key" v-on:click="addJury(key)">+</button>
                        </li>
                    </ul>
                </div>
                <div v-if="eventJurys">
                    <label for="jury">Membres du jury</label>
                    <ul>
                        <li v-for="(jury, key) in eventJurys" :value="jury.id" :id="key">
                            {{jury.name}}
                            <button type="submit" class="btn btn-danger" :id="key">-</button>
                        </li>
                    </ul>
                </div>
            </div> 
            <div class="form-group">
                <label for="jury">Membres du jury validé</label>
                <ul>
                    <li v-for="(user, key) in students" :id="key" :value="user.id">
                        {{user.name}}
                        <button type="submit" class="btn btn-primary" @click="addStudent(key)">+</button>
                    </li>
                </ul>
            </div>
            <div v-if="eventJurys">
                <label for="jury">Etudiant du jury</label>
                <ul>
                    <li v-for="(jury, key) in eventStudents" :value="jury.id" :id="key">
                        {{jury.name}}
                        <button type="submit" class="btn btn-danger" :id="key" v-on:click="removeStudent(key)">-</button>
                    </li>
                </ul>
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
import { CREATE_EVENT_MUTATION } from '../constants/EventsCreate.gql'
import { ALL_STUDENT_QUERY } from '../constants/StudentsAll.gql'
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
            'eventJurys',
            'eventStudents',
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
            'removeStudent'
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
            this.$store.commit('allStudents', this.allStudents, {root: true})
        }).catch(error => {
            console.log("---User recuperation failed " + error)
        });
        
    }
};
</script>