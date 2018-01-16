<style lang="sass" scoped>
nav
  position: absolute;
  height: 100vh;
  background: #448aff;
  width: 256px;
  z-index: 10;
  transform: translateX(-270px)
  transition: .5s;
  box-shadow: -20px -15px 20px 20px #000;
  &.open
    transform: translateX(0px)
    transition: .5s
  .menu
    margin-top: 50px
    a
      display: block;
      color: #fff;
      &:hover
        color: #fff
        text-transform: underline;
    ul
      color: #fff
      .dashboard
        a
          margin: 0 0 25px 0
          display: inline-block
          vertical-align: sub
      &:not(:last-of-type)
        margin-bottom: 25px
      span i
        transition: .2s
      &:hover
        cursor: pointer
      &.open
        li
          display: block;
          margin-top: 10px;
          margin-left: 40px
        span i
          transform: rotate(90deg)
          transition: .2s;
      li
        display: none;
button
  border: none;
  background: none;
  transform: translateX(0)
  position: absolute;
  top: 0;
  left: 0;
  transition: .5s;
  i
  &:hover
    cursor: pointer;
  &.close
    z-index: -1
    transform: translateX(0)
    transition: .3s

  &.open
    transform: translateX(256px)
    transition: .5s
    left: -60px;
    z-index: 100;
</style>

<template>
  <div>
    <button v-if="!menuIsOpen" @click="menuIsOpen = true;">
      <md-icon style="color:white; font:bold;" class="md-size-2x">menu</md-icon>
    </button>
    <button :class="{ close: !menuIsOpen,open: menuIsOpen }"@click="menuIsOpen = false">
      <md-icon style="color:white; font:bold;" class="md-size-2x">close</md-icon>
    </button>
    <nav :class="{ open: menuIsOpen }">
        <template v-if="userId">
          <div class="menu" v-if="currentUser.isAdmin">
              <ul>
                <span class="dashboard" @click.prevent="menuIsOpen = false">
                  <md-icon style="color:white; font:bold;">home</md-icon>
                  <router-link class="test" :to="{name :'home'}" >Dashboard</router-link>
                </span>
                <ul :class="{ open: userMenuIsOpen }">
                  <span @click="userMenuIsOpen ? userMenuIsOpen = false : userMenuIsOpen = true">
                    <md-icon>keyboard_arrow_right</md-icon>
                    Utilisateurs
                  </span>
                  <li @click.prevent="menuIsOpen = false">
                    <router-link :to="{name :'users'}">Tout les utilisateurs</router-link>
                  </li>
                  <li @click.prevent="menuIsOpen = false">
                    <router-link :to="{name :'addUser'}" >Ajouter un utilisateur</router-link>
                  </li>
                </ul>
                <ul :class="{ open: studentMenuIsOpen }">
                  <span @click="studentMenuIsOpen ? studentMenuIsOpen = false : studentMenuIsOpen = true">
                    <md-icon>keyboard_arrow_right</md-icon>
                    Étudiants
                  </span>
                  <li @click.prevent="menuIsOpen = false">
                    <router-link :to="{name :'students'}" >Tous les étudiants</router-link>
                  </li>
                  <li @click.prevent="menuIsOpen = false">
                    <router-link :to="{name :'addStudent'}" >Ajouter un étudiant</router-link>
                  </li>
                </ul>
                <ul :class="{ open: eventMenuIsOpen }">
                  <span @click="eventMenuIsOpen ? eventMenuIsOpen = false : eventMenuIsOpen = true">
                    <md-icon>keyboard_arrow_right</md-icon>
                    Événements
                  </span>
                  <li @click.prevent="menuIsOpen = false">
                    <router-link :to="{name :'events'}" >Tous les événements</router-link>
                  </li>
                  <li @click.prevent="menuIsOpen = false">
                    <router-link :to="{name :'addEvent'}" >Ajouter un événement</router-link>
                  </li>
                </ul>
                <ul :class="{ open: projectMenuIsOpen }">
                  <span @click="projectMenuIsOpen ? projectMenuIsOpen = false : projectMenuIsOpen = true">
                    <md-icon>keyboard_arrow_right</md-icon>
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
