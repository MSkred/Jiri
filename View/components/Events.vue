<template>
  <div class="container">
      <h1>Tous les événements</h1>
      <div class="container__event event">
          <a v-for="(event, key) in events" :value="event.id" :key="event.id" class="event__item">
              <h2 class="title">{{event.courseName}}</h2>
              <span class="year">{{event.academicYear}}</span>
              <span class="jurys"></span>
              <span class="students"></span>
              <span class="projects"></span>
          </a>
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
