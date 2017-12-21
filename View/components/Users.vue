<template>
  <div class="container">
      <h1>Tous les utilisateurs</h1>
      <div class="container__user user">
          <router-link v-for="(user, key) in users" :to="{name: 'user', params: {id: user.id}}" :href="`/user/${user.id}`">
            <div class="user__item" v-if="!user.softDelete">
                <h2 class="title">{{user.name}}</h2>
                <p class="year">{{user.company}}</p>
                <p class="event">{{user.juryEvents.length}} événements</p>
                <p class="meeting">{{user.meetings.length}} meetings</p>
                <button @click.prevent="setDesactivate(user.id)">Désactiver</button>
            </div>
          </router-link>
      </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    name: 'users',
    computed: {
        ...mapGetters([
            'users',
        ])
    },
    methods: {
        ...mapActions([
            'setDesactivate',
        ])
    },
    actions: {
        ...mapActions([
            'setAllUsers',
        ])
    },
    created(){
        //Users recuperation
        this.$store.dispatch('setAllUsers')
    }
}
</script>