<template>
  <nav>
      <router-link v-if="userId" :to="{name :'home'}">Dashboard</router-link>
      <router-link v-if="userId" :to="{name :'addUser'}">Ajouter un utilisateur</router-link>
      <router-link v-if="userId" :to="{name :'addStudent'}">Ajouter un étudiant</router-link>
      <router-link v-if="userId" :to="{name :'addProject'}">Ajouter un projet</router-link>
      <router-link v-if="userId" :to="{name :'addEvent'}">Ajouter un événement</router-link>
      <router-link :to="{name :'login'}" v-if="!this.userId">Se connecter</router-link>
      <a href="javascript:avoid" @click.prevent="logout()" v-if="this.userId">Se deconecter</a>
  </nav>
</template>

<script>
export default {
  name: 'navigation',
  props: {
      userId: {
      required: false,
      type: String,
      }
  },
  methods:{
    logout(){
      localStorage.removeItem('graphcoolToken')
      this.$router.push({ name: 'login'})
      window.location.reload()
    }
  }
}
</script>
