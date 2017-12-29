<template>
  <div>
      <div class="container">
      <h1>Ajouter un utilisateur</h1>
            <div class="form-group">
                <label for="name">Prénom et nom</label>
                <input v-model="name" type="text" id="name" name="name" placeholder="Écrivez le prénom et nom" class="form-control">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="email" type="email" id="email" name="email" placeholder="Écrivez l'adresse mail" class="form-control">
            </div>
            <div class="form-group">
                <label for="password">Mot de passe</label>
                <input v-model="password" type="password" id="password" name="password" placeholder="Écrivez le mot de passe" class="form-control">
            </div>
            <div class="form-group">
                <label for="company">Entreprise</label>
                <input v-model="company" type="text" id="company" name="company" placeholder="Écrivez l'entreprise" class="form-control">
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary" @click.prevent="createUser">Créer un utilisateur</button>
            </div>
      </div>
  </div>
</template>
<script>
import {Bus} from '../Bus'

export default {
    name: 'add-user',
    data () {
      return {
        isAdmin: false,
        name: null,
        email: null,
        password: null,
        company: null,
        softDelete: false,
      }
    },
    methods: {
        createUser() {
            let {email, password, name, company, isAdmin, softDelete} = this;
            Bus.$emit('createUser', {email, password, name, company, isAdmin, softDelete});
        }
    },
};
</script>
