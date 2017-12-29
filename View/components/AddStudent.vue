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
import {Bus} from '../Bus'

export default {
    name: 'add-student',
    data(){
        return{
            name: null,
            email: null,
            softDelete: false,
        }
    },
    methods: {
        createStudent() {
            let {email, name, softDelete} = this;
            Bus.$emit('createStudent', {email, name, softDelete});
        }
    },
};
</script>
