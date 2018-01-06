<template>
  <div>
      <div class="wrapper">
        <section class="hero is-link">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Connexion à Jiri
                    </h1>
                </div>
            </div>
        </section>
        <form>
            <md-field >
                <label for="email">Email</label>
                <md-input name="email" id="email" type="email" placeholder="Écrivez l'adresse mail" v-model="email" 
                        data-vv-as="Le champs email" 
                        data-vv-validate-on="blur"
                        v-validate="'required|email'"
                        :class="{'is-danger': errors.has('email') }"/>
            </md-field>
            <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
            <md-field>
                <label for="password">Mot de passe</label>
                <md-input name="password" id="password" type="password" placeholder="Écrivez le mot de passe" v-model="password" 
                        data-vv-as="Le champs mot de passe" 
                        data-vv-validate-on="blur"
                        v-validate="'required|min:4'"
                        :class="{'is-danger': errors.has('password') }"/>
            </md-field>
            <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
            <md-button @click="authentification" class="md-dense md-raised md-primary">
                Se connecter
            </md-button>
        </form>
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
