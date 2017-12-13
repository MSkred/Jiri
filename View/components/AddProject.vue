<template>
  <div>
      <div class="container">
      <h1>Ajouter un projet</h1>
            <div class="form-group">
                <label for="name">Nom du projet</label>
                <input v-model="name" type="text" id="name" name="name" placeholder="Écrivez le prénom et nom" class="form-control">
            </div>
            <div class="form-group">
                <label for="description">Description du projet</label>
                <textarea v-model="description" name="decription" id="description" cols="30" rows="10" class="form-control"></textarea>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary" @click="createProject">Créer un étudiant</button>
            </div>
      </div>
  </div>
</template>

<script>
import VueApollo from 'vue-apollo'
import nanoid from 'nanoid'

import { CREATE_PROJECT_MUTATION } from '../constants/ProjectsCreate.gql'
export default {
  name: 'add-project',
  data(){
      return{
          name: null,
          description: null, 
          softDelete: false,
      }
  },
  methods: {
      createProject(){
          const { name, description, softDelete } = this;
          this.$apollo.mutate({
              mutation: CREATE_PROJECT_MUTATION,
              variables: {
                  name,
                  description,
                  softDelete
              },
          }).then(data => {
              console.log('Done project creation.');
          }).catch(error => {
              console.log('---Project creation failed' + error)
          });
      }
  }
}
</script>
