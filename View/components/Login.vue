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
//import passport from 'passport';
//let LocalStrategy = require('passport-local').Strategy;
//import UserMongo from '../../Model/mongoose/user'

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
            console.log('info')
        }
    }
}
</script>
