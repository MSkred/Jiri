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
                <button type="submit" class="btn btn-primary" @click="createUser">Créer un utilisateur</button>
            </div>
      </div>
  </div>
</template>
<script>

import VueApollo from 'vue-apollo'

// GraphQL Mutation with one parameter
import { CREATE_USER_MUTATION } from './constants/UsersCreate.gql'
export default {
    name: 'add-user',
    data () {
      return {
        id: '10',
        is_admin: false,
        name: '',
        email: '',
        password: '',
        company: '',
        soft_delete: false,
      }
    },
  methods: {
      createUser(){
          const { id, is_admin, name, email, password, company, soft_delete } = this;
        console.log(this.$apollo)
          this.$apollo.mutate({
              mutation: CREATE_USER_MUTATION,
              variables: {
                id,
                is_admin,
                name,
                email,
                password,
                company,
                soft_delete
              },
          }).then(data => {
              console.log('Done creation user.');
          }).catch(error => {
              console.log(error);
          });
      },
  },
};
</script>
