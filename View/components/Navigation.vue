<template>
  <nav>
      <router-link :to="{name :'home'}">Dashboard</router-link>
      <router-link :to="{name :'addUser'}">Ajouter un utilisateur</router-link>
      <router-link :to="{name :'addStudent'}">Ajouter un étudiant</router-link>
      <router-link :to="{name :'addProject'}">Ajouter un projet</router-link>
      <router-link :to="{name :'addEvent'}">Ajouter un événement</router-link>
      <router-link :to="{name :'login'}" >Se connecter</router-link>
      <a v-if="" href="javascript:avoid" @click.prevent="logout()" >Se deconecter</a>
  </nav>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'navigation',
  methods:{
    logout(){
      localStorage.removeItem('graphcoolToken')
      this.$router.push({ name: 'login'})
      window.location.reload()
    },
  computed: {
    ...mapGetters([
        'userId',
    ])
  },
  }
}
</script>
