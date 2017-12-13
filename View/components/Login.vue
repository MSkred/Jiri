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
                <button type="submit" class="btn btn-primary" @click="authentification">Se connecter</button>
            </div>
      </div>
  </div>
</template>
<script>

import VueApollo from 'vue-apollo'
import { LOGIN_USER_MUTATION } from '../constants/UsersLogin.gql'
import {mapGetters, mapMutations} from 'vuex'
export default {
    name: 'login',
    data(){
        return{
            email: null, 
            password: null,
        }
    },
    methods: {
        ...mapMutations([
            'setUserDatasInState',
        ]),
        authentification(){
            const { email, password } = this;
            this.$apollo.mutate({
                mutation: LOGIN_USER_MUTATION,
                variables: {
                    email,
                    password,
                },
            }).then(data => {
              console.log('Authentification succes');
              localStorage.setItem('graphcoolToken', data.data.authenticateUser.token)
              localStorage.setItem('graphcoolId', data.data.authenticateUser.id)
              this.$router.push({ name: 'home'})
              window.location.reload()
            }).catch(error => {
                console.log('---Authentification failed' + error)
            });
        }
    },
}
</script>
