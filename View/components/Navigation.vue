<template>
  <nav class="navbar is-link" role="navigation" aria-label="dropdown navigation">
      <template v-if="userId">
        <div class="navbar-start">
          <router-link :to="{name :'home'}" class="navbar-item">Dashboard</router-link>
          <div class="navbar-item has-dropdown is-hoverable">
            <router-link :to="{name :'users'}" class="navbar-link">Tous les utilisateurs</router-link>
            <div class="navbar-dropdown">
              <router-link :to="{name :'addUser'}" class="navbar-item">Ajouter un utilisateur</router-link>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <router-link :to="{name :'students'}" class="navbar-link">Tous les étudiants</router-link>
            <div class="navbar-dropdown">
              <router-link :to="{name :'addStudent'}" class="navbar-item">Ajouter un étudiant</router-link>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <router-link :to="{name :'events'}" class="navbar-link">Tous les événements</router-link>
            <div class="navbar-dropdown">
              <router-link :to="{name :'addEvent'}" class="navbar-item">Ajouter un événement</router-link>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
              <router-link :to="{name :'addProject'}" class="navbar-link">Tous les projets</router-link>
            <div class="navbar-dropdown">
              <router-link :to="{name :'addProject'}" class="navbar-item">Ajouter un projet</router-link>
            </div>
          </div>
        </div>
        <div class="navbar-end">
          <a href="javascript:avoid" @click.prevent="logout()"  class="navbar-item">Se deconecter</a>
          <router-link v-if="!userId" :to="{name :'login'}" class="navbar-item">Se connecter</router-link>
        </div>
      </template>
  </nav>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'navigation',
  methods:{
    logout(){
      localStorage.removeItem('graphcoolToken')
      
      // Redirect to login
      location.assign('/login')
    },
    ...mapActions([
        'setCurrentUser'
    ])
  },
  computed: {
    ...mapGetters([
      'userId',
      'userData'
    ])
  },
  updated() {
    this.$store.dispatch('setCurrentUser')
    console.log(this.userData.name)
  }
}
</script>
