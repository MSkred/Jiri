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
                <label for="jury">Ajoutez des membres du jury</label>
                <select v-model="currentJury" v-on:change="setJury" name="jury" id="jury">
                    <option v-for="user in allUsers" :value="user.id">{{user.name}}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="jury">Ajoutez des étudiants</label>
                <select v-model="students" name="student" id="student" >
                    <option v-for="student in allStudents" :value="student.id">{{student.name}}</option>
                </select>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary" @click="createEvent">Créer un événement</button>
            </div>
      </div>
  </div>
</template>

<script>


import VueApollo from 'vue-apollo'
import nanoid from 'nanoid'

import { CREATE_EVENT_MUTATION } from '../constants/EventsCreate.gql'
import { ALL_USER_QUERY } from '../constants/UsersAll.gql'
import { ALL_STUDENT_QUERY } from '../constants/StudentsAll.gql'
export default {
  name: 'add-event',
  data(){
      return{
          courseName: null,
          academicYear: null,
          softDelete: false,
          authorId: "cjazgxq0mo64601002c9kc42z",
          currentJury: null,
          allUsers: [],
          allStudents: [],
          jurysIds: [],
          students: [],
      }
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
      setJury(){
          this.jurysIds.push(this.currentJury);
      }
  },
  created(){
      
// var min = new Date().getFullYear(),
//     max = new Date().getFullYear()+10;

// for (var i = min; i<=max; i++){
//     var select = document.getElementById('academicYear');
//     var opt = document.createElement('option');
//     opt.value = i;
//     opt.innerHTML = (i-1) + ' - ' + (i);
//      document.getElementById('academicYear').appendChild(opt);
//     }

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
        }).catch(error => {
            console.log("---User recuperation failed " + error)
        });
    }
};
</script>