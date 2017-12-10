<template>
  <nav>
      <router-link :to="{name :'home'}">Dashboard</router-link>
      <router-link :to="{name :'addUser'}">Ajouter un utilisateur</router-link>
      <router-link :to="{name :'addStudent'}">Ajouter un étudiant</router-link>
      <router-link :to="{name :'addProject'}">Ajouter un projet</router-link>
      <router-link :to="{name :'addEvent'}">Ajouter un événement</router-link>
      <router-link :to="{name :'login'}">Se connecter</router-link>
  </nav>
</template>

<script>
export default {
  name: 'navigation',
}
</script>
