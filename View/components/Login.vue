<template>
  <div>
      <div class="container">
      <h1>Se connecter</h1>
            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="email" type="email" id="email" name="email" placeholder="Écrivez l'adresse mail" class="form-control">
            </div>
            <div class="form-group">
                <label for="password">Mot de passe</label>
                <input v-model="password" type="password" id="password" name="password" placeholder="Écrivez le mot de passe" class="form-control">
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary" @click="authentification">Créer un utilisateur</button>
            </div>
      </div>
  </div>
</template>
<script>

import { LOGIN_USER_MUTATION } from '../constants/UsersLogin.gql'
export default {
    name: 'login',
    data(){
        return{
            email: null, 
            password: null,
        }
    },
    methods: {
        authentification(){
            const { email, password } = this;
            this.$apollo.query({
                query: LOGIN_USER_QUERY,
                variables: {
                    email,
                    password
                },
            }).then(data => {
                console.log('Done recuperation user.');
                if( data.data.User.password == this.password ){
                    console.log('password good');
                } else{
                    console.log('password not good')
                }
            }).catch(error => {
                console.log("---User recuperation failed " + error)
            });
        }
    }
}
</script>
