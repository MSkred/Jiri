<template>
  <nav>
      <template v-if="userId">
        <router-link :to="{name :'home'}">Dashboard</router-link>
        <router-link :to="{name :'addUser'}">Ajouter un utilisateur</router-link>
        <router-link :to="{name :'addStudent'}">Ajouter un étudiant</router-link>
        <router-link :to="{name :'addProject'}">Ajouter un projet</router-link>
        <router-link :to="{name :'addEvent'}">Ajouter un événement</router-link>
        <router-link :to="{name :'events'}">Tous les événements</router-link>
        <a href="javascript:avoid" @click.prevent="logout()" >Se deconecter</a>
      </template>
      <router-link v-if="!userId" :to="{name :'login'}">Se connecter</router-link>
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
    ])
  },
  updated() {
      this.$store.dispatch('setCurrentUser')
  }
}
</script>
