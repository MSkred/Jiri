<template>
    <nav class="navbar is-transparent">
      <div class="navbar-brand">
        <router-link :to="{name :'home'}" class="navbar-item">Jiri</router-link>
        <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navbarExampleTransparentExample" class="navbar-menu" v-if="userId">
        <div class="navbar-start" v-if="currentUser.isAdmin">
          <router-link :to="{name :'home'}" class="navbar-item">Dashboard</router-link>
          <div class="navbar-item has-dropdown is-hoverable">
            <router-link :to="{name :'users'}" class="navbar-link">Tous les utilisateurs</router-link>
            <div class="navbar-dropdown is-boxed">
              <router-link :to="{name :'addUser'}" class="navbar-item">Ajouter un utilisateur</router-link>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <router-link :to="{name :'students'}" class="navbar-link">Tous les étudiants</router-link>
            <div class="navbar-dropdown is-boxed">
              <router-link :to="{name :'addStudent'}" class="navbar-item">Ajouter un étudiant</router-link>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <router-link :to="{name :'events'}" class="navbar-link">Tous les événements</router-link>
            <div class="navbar-dropdown is-boxed">
              <router-link :to="{name :'addEvent'}" class="navbar-item">Ajouter un événement</router-link>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
              <router-link :to="{name :'projects'}" class="navbar-link">Tous les projets</router-link>
            <div class="navbar-dropdown is-boxed">
              <router-link :to="{name :'addProject'}" class="navbar-item">Ajouter un projet</router-link>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <a href="javascript:avoid" @click.prevent="logout()"  class="navbar-item">Se deconecter</a>
              </p>
              <p class="control">
                <router-link v-if="!userId" :to="{name :'login'}" class="navbar-item">Se connecter</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
</template>


<script>
import {mapGetters} from 'vuex'
import { USER_QUERY } from '../constants/User.gql'

export default {
  name: 'navigation',
  data(){
    return{
      currentUser: {},
    }
  },
  computed: {
    ...mapGetters([
      'userId',
    ])
  },
  apollo: {
    currentUser: {
      query: USER_QUERY,
        variables() {
            // Use vue reactive properties
            return {
                id: this.userId,
            }
        },
        update(data){
            //console.log(data)
            console.log('User data get done')
            return data.User
        }
    }
  },
  methods:{
    logout(){
      localStorage.removeItem('userToken')
      
      // Redirect to login
      location.assign('/login')
    },
  },
}
</script>
