<template>
  <div class="container">
      <h1>Tous les étudiants</h1>
      <div class="container__student student">
          <router-link v-for="(student, key) in allStudents" :to="{name: 'student', params: {id: student.id}}" :href="`/student/${student.id}`">
            <div class="student__item">
                <h2 class="title">{{student.name}}</h2>
                <p class="year">{{student.email}}</p>
                <p class="event">{{student.studentEvents.length}} événements</p>
                <p class="meeting">{{student.implementations.length}} implémentations</p>
            </div>
          </router-link>
      </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    name: 'students',
    computed: {
        ...mapGetters([
            'allStudents',
        ])
    },
    actions: {
        ...mapActions([
            'setAllStudents',
        ])
    },
    created(){
        // students recuperation
        this.$store.dispatch('setAllStudents')
    }
}
</script>