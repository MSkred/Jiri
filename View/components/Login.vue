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
import {Bus} from '../Bus'
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
            let {email, password} = this;
            Bus.$emit('authentification', {email, password})
        }
    },
}
</script>
