<template>
  <div>
      <div class="container">
      <h1>Ajouter un étudiant</h1>
            <div class="form-group">
                <label for="name">Prénom et nom</label>
                <input v-model="name" type="text" id="name" name="name" placeholder="Écrivez le prénom et nom" class="form-control">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="email" type="email" id="email" name="email" placeholder="Écrivez l'adresse mail" class="form-control">
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary" @click="createStudent">Créer un étudiant</button>
            </div>
      </div>
  </div>
</template>

<script>

import VueApollo from 'vue-apollo'
import nanoid from 'nanoid'

import { CREATE_STUDENT_MUTATION } from '../constants/StudentsCreate.gql'
export default {
  name: 'add-student',
  data(){
      return{
          id: nanoid(),
          name: null,
          email: null,
          soft_delete: false,
      }
  },
  methods: {
      createStudent(){
          const { id, name, email, soft_delete } = this;
          this.$apollo.mutate({
              mutation: CREATE_STUDENT_MUTATION,
              variables: {
                  id,
                  name,
                  email,
                  soft_delete
              },
          }).then(data => {
              console.log('Done student creation.');
          }).catch(error => {
              console.log('---Student creation failed' + error)
          });
      },
  },
};
</script>
