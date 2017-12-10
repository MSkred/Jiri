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
                <select name="academicYear" id="academicYear" class="form-control"></select>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary" @click="createEvent">Créer un événement</button>
            </div>
      </div>
  </div>
</template>

<script>

var min = new Date().getFullYear(),
    max = new Date().getFullYear()+10,
    select = document.getElementById('academicYear');

for (var i = min; i<=max; i++){
    var opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = (i-1) + ' - ' + (i);
    select.appendChild(opt);
    }

import VueApollo from 'vue-apollo'
import nanoid from 'nanoid'

import { CREATE_EVENT_MUTATION } from '../constants/EventsCreate.gql'
export default {
  name: 'add-event',
  data(){
      return{
          courseName: null,
          academicYear: null,
          softDelete: false,
          authorId: "cjazgxq0mo64601002c9kc42z",
      }
  },
  methods: {
      createEvent(){
          const { courseName, academicYear, softDelete, authorId } = this;
          this.$apollo.mutate({
              mutation: CREATE_EVENT_MUTATION,
              variables: {
                  courseName,
                  academicYear,
                  softDelete,
                  authorId
              },
          }).then(data => {
              console.log('Done event creation.');
          }).catch(error => {
              console.log('---Event creation failed' + error)
          });
      },
  },
};