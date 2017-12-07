<template>
  <nav>
      <router-link :to="{name :'home'}">Dashboard</router-link>
      <router-link :to="{name :'addUser'}">Ajouter un utilisateur</router-link>
      <router-link :to="{name :'addStudent'}">Ajouter un étudiant</router-link>
  </nav>
</template>

<script>
export default {
  name: 'navigation',
}
</script>
