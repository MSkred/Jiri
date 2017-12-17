<template>
    <div class="container">
        <h1>Meeting avec {{meeting.student.name}} </h1>
        <!-- <p>{{event.academicYear}}</p>
        <div class="container__jurys jurys">
            <h2>Sélectionner les meeting</h2>
            <div v-for="(implementation, key) in event.implementations" class="jurys__item">
                <p>{{implementation.project.name}}</p>
            </div>
        </div>
        <router-link :to="{name: 'addMeeting', params: {id: id}}" :href="`/event/${id}/addMeeting`">
            Commencer un meeting
        </router-link> -->
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
    name: 'Meeting',
    props: [
        'id',
        'eventId',
        'studentId'
    ],
    computed: {
        ...mapGetters([
            'meeting',
        ])
    },
    created(){
        // Meeting datas recupeartion
        this.$store.dispatch('setMeeting', {id: this.id, studentId: this.studentId})
    },
    
}
</script>
