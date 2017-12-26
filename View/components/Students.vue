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
                            <button class="modify"  @click.prevent="showModifyModal = true; setModifyData(student)">Modifier</button>
                            <button id="show-modal" @click.prevent="showDesactivateModal = true; setDesactivateData(student)">Désactiver</button>
                        </div>
                    </div>
                </router-link>
            </div>
            <desactivate v-if="showDesactivateModal" >
                    <h3 slot="header">Voullez-vous vraiment désactiver {{modalItem.name}}</h3>
                    <div slot="footer">
                        <button @click.prevent="setDesactivateStudent(modalItem.id)">Désactiver</button>
                        <button @click.prevent="showDesactivateModal = false">Annuler</button>
                    </div>
            </desactivate>  
      </div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
import Desactivate from './Desactivate.vue';
export default {
    name: 'students',
    components: {
        Desactivate,
    },
    data(){
        return{
            showDesactivateModal: false,
            showModifyModal: false,
        }
    },
    computed: {
        ...mapGetters([
            'allStudents',
            'modalItem'
        ])
    },
    methods: {
        ...mapActions([
            'setDesactivateStudent',
        ]),
        ...mapMutations([
            'setDesactivateData',
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