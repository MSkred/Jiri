<template>
    <div class="wrapper">
        <section class="hero is-link">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Dashboard
                    </h1>
                    <h2 class="subtitle">
                        Bonjour {{currentUser.name}} vous êtes connecté en tant <span v-if="currentUser.isAdmin">que administrateur</span><span v-else>qu'utilisateur</span>
                    </h2>
                </div>
            </div>
        </section>
        <h2>Les événements auquel vous participez</h2>
        <div class="papa">
            <div v-for="(event, key) in currentUser.juryEvents" class="enfant">
                <router-link :to="{name: 'event', params: {id: event.id}}" :href="`/event/${event.id}`" class="contenu">
                    <div class="flex">
                        <div class="flex__header">
                            <h1 class="title">{{event.courseName}}</h1>
                            <p class="subtitle">{{event.academicYear}}</p>
                        </div>
                        <div class="flex__content">
                            <p></p>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>


<script>  
import { USER_QUERY } from '../constants/User.gql'
import {mapGetters} from 'vuex'

export default {
  name: 'home',
  data(){
    return{
      currentUser: {},
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
            //console.log(data)
            console.log('User data get done')
            return data.User
        }
    }
  },
  methods: {
     
  }
}
</script>