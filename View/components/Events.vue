<template>
  <div class="container">
      <h1>Tous les événements</h1>
      <div class="container__event event">
          <router-link v-for="(event, key) in events" :to="{name: 'event', params: {id: event.id}}" :href="`/event/${event.id}`">
            <div class="event__item">
                <h2 class="title">{{event.courseName}}</h2>
                <p class="year">{{event.academicYear}}</p>
                <p class="jurys">{{event.jurys.length}} jurys</p>
                <p class="students">{{event.students.length}} étudiants</p>
            </div>
          </router-link>
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'events',
    computed: {
        ...mapGetters([
            'events',
        ])
    },
    created(){
        // Events recupeartion
        this.$store.dispatch('setAllEvents');
    }
}
</script>
