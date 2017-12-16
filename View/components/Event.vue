<template>
    <div class="container">
        <h1>{{event.courseName}}</h1>
        <p>{{event.academicYear}}</p>
        <div class="container__jurys jurys">
            <h2>Les jurys de l'événement</h2>
            <div v-for="(jury, key) in event.jurys" class="jurys__item">
                <p>{{jury.name}}</p>
                <p>{{jury.email}}</p>
                <p>{{jury.company}}</p>
            </div>
        </div>
        <div class="container__students students">
            <h2>Les étudiants de l'événement</h2>
            <div v-for="(student, key) in event.students" class="students__item">
                <p>{{student.name}}</p>
                <p>{{student.email}}</p>
            </div>
        </div>
        <router-link :to="{name: 'addMeeting', params: {id: id}}" :href="`/event/${id}/addMeeting`">
            Commencer un meeting
        </router-link>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'SingleEvent',
    props: ['id'],
    computed: {
        ...mapGetters([
            'event',
        ])
    },
    created(){
        // Event recupeartion
        this.$store.dispatch('setEvent', this.id);
    }
}
</script>
