<template>
  <div class="container">
      <h1>Tous les utilisateurs</h1>
      <div class="container__user user">
          <router-link v-for="(user, key) in users" :to="{name: 'user', params: {id: user.id}}" :href="`/user/${user.id}`">
            <div class="user__item">
                <h2 class="title">{{user.name}}</h2>
                <p class="year">{{user.company}}</p>
                <p class="event"> jurys</p>
                <p class="meeting"> étudiants</p>
            </div>
          </router-link>
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'users',
    computed: {
        ...mapGetters([
            'users',
        ])
    },
    created(){
        // Users recuperation
        this.$store.dispatch('setAllUsers')
    }
}
</script>