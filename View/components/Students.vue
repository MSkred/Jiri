<template>
    <div class="wrapper">
        <section class="hero is-link">
            <div class="hero-body">
                <div class="container">
                <h1 class="title">
                    Tous les étudiants
                </h1>
                <h2 class="subtitle">
                    Primary subtitle
                </h2>
                </div>
            </div>
        </section>
      <div class="papa">
          <div class="enfant" v-for="(student, key) in allStudents" >
            <router-link class="contenu" :to="{name: 'student', params: {id: student.id}}" :href="`/student/${student.id}`">
                <div class="flex" v-if="!student.softDelete">
                    <div class="flex__header">
                        <h2 class="title">{{student.name}}</h2>
                        <p class="subtitle">{{student.email}}</p>
                    </div>
                    <div class="flex__content">
                        <p class="event">{{student.studentEvents.length}} événements</p>
                        <p class="meeting">{{student.implementations.length}} implémentations</p>
                    </div>
                    <div class="flex__footer">
                        <button class="modify"  @click.prevent="showModifyModal = true; setModifyData(user)">Modifier</button>
                        <button id="show-modal" @click.prevent="showDesactivateModal = true; setDesactivateData(user)">Désactiver</button>
                    </div>
                </div>
            </router-link>
          </div>
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