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
    ul
      &:hover
        cursor: pointer
      &.open
        li
          display: block;
      li
        display: none;
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
              <ul>
                <li>
                  <router-link class="test" :to="{name :'home'}" >Dashboard</router-link>
                </li>
                <ul :class="{ open: userMenuIsOpen }">
                  <span @click="userMenuIsOpen ? userMenuIsOpen = false : userMenuIsOpen = true">Utilisateurs</span>
                  <li @click.prevent="menuIsOpen = false">
                    <router-link :to="{name :'users'}">Tout les utilisateurs</router-link>
                  </li>
                  <li @click.prevent="menuIsOpen = false">
                    <router-link :to="{name :'addUser'}" >Ajouter un utilisateur</router-link>
                  </li>
                </ul>
                <ul :class="{ open: studentMenuIsOpen }">
                  <span @click="studentMenuIsOpen ? studentMenuIsOpen = false : studentMenuIsOpen = true">Étudiants</span>
                  <li>
                    <router-link :to="{name :'students'}" >Tous les étudiants</router-link>
                  </li>
                  <li>
                    <router-link :to="{name :'addStudent'}" >Ajouter un étudiant</router-link>
                  </li>
                </ul>
                <ul :class="{ open: eventMenuIsOpen }">
                  <span @click="eventMenuIsOpen ? eventMenuIsOpen = false : eventMenuIsOpen = true">Événements</span>
                  <li @click.prevent="menuIsOpen = false">
                    <router-link :to="{name :'events'}" >Tous les événements</router-link>
                  </li>
                  <li @click.prevent="menuIsOpen = false">
                    <router-link :to="{name :'addEvent'}" >Ajouter un événement</router-link>
                  </li>
                </ul>
                <ul :class="{ open: projectMenuIsOpen }">
                  <span @click="projectMenuIsOpen ? projectMenuIsOpen = false : projectMenuIsOpen = true">
                    Projets
                  </span>
                  <li @click.prevent="menuIsOpen = false">
                    <router-link :to="{name :'projects'}" >Tous les projets</router-link>
                  </li>
                  <li @click.prevent="menuIsOpen = false">
                    <router-link :to="{name :'addProject'}" >Ajouter un projet</router-link>
                  </li>
                </ul>
              </ul>
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
      userMenuIsOpen: false,
      studentMenuIsOpen: false,
      eventMenuIsOpen: false,
      projectMenuIsOpen: false,
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
  // updated(){
  //   if(this.menuIsOpen){
  //     this.menuIsOpen = false;
      
  //   }
  // }
}
</script>
