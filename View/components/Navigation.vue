<style lang="sass" scoped>
nav
  position: absolute;
  height: 100vh;
  background: pink;
  width: 256px;
  z-index: 10;
  transform: translateX(-256px)
  transition: .5s;
  &.open
    transform: translateX(0px)
    transition: .5s
  .menu
    a
      display: block;
button
  transform: translateX(0)
  position: absolute;
  top: 0;
  left: 0;
  transition: .5s;
  &.close
    z-index: -1
    transform: translateX(0)
    transition: .5s

  &.open
    transform: translateX(256px)
    transition: .5s
</style>

<template>
  <div>
    <button v-if="!menuIsOpen" @click="menuIsOpen = true;">Open</button>  
    <button :class="{ close: !menuIsOpen,open: menuIsOpen }"@click="menuIsOpen = false;">X</button>  
    <nav :class="{ open: menuIsOpen }">
        <template v-if="userId">
          <div class="menu" v-if="currentUser.isAdmin">
              <router-link :to="{name :'home'}" >Dashboard</router-link>
              <router-link :to="{name :'users'}" >Tous les utilisateurs</router-link>
              <router-link :to="{name :'addUser'}" >Ajouter un utilisateur</router-link>
              <router-link :to="{name :'students'}" >Tous les étudiants</router-link>
              <router-link :to="{name :'addStudent'}" >Ajouter un étudiant</router-link>
              <router-link :to="{name :'events'}" >Tous les événements</router-link>
              <router-link :to="{name :'addEvent'}" >Ajouter un événement</router-link>
              <router-link :to="{name :'projects'}" >Tous les projets</router-link>
              <router-link :to="{name :'addProject'}" >Ajouter un projet</router-link>
          </div>
          <div class="connect">
            <a href="javascript:avoid" @click.prevent="logout()"  >Se deconecter</a>
            <router-link v-if="!userId" :to="{name :'login'}" >Se connecter</router-link>
          </div>
        </template>
    </nav>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { USER_QUERY } from '../constants/User.gql'

export default {
  name: 'navigation',
  data(){
    return{
      currentUser: {},
      menuIsOpen: false,
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
