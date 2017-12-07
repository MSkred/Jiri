<template>
  <nav>
      <router-link :to="{name :'home'}">Dashboard</router-link>
      <router-link :to="{name :'addUser'}">Ajouter un user</router-link>
  </nav>
</template>

<script>
export default {
  name: 'navigation',
}
</script>
