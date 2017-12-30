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
                <label for="weight">Pondération du projet</label>
                <input type="number" v-model="weight" id="weight" name="weight">
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary" @click="createProject">Créer un étudiant</button>
            </div>
      </div>
  </div>
</template>

<script>
import {Bus} from '../Bus'

export default {
    name: 'add-project',
    data(){
        return{
            name: null,
            description: null, 
            weight: null,
            softDelete: false,
        }
    },
    methods: {
        createProject() {
            let { description, name, softDelete } = this,
                weight = parseFloat(this.weight);
            Bus.$emit('createProject', { description, name, softDelete, weight });
        }
    }
}
</script>
