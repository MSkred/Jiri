<template>
    <div class="container">
        <h1>Meeting avec {{meeting.student.name}} </h1>
         <fieldset>
            <h2 class="fs-title">Ajoutez les projets</h2>
            <h3 class="fs-subtitle">Ceci est l'étape 2</h3>
            <label for="project">Sélectionnez les projets</label>
            <label v-for="(implementation, key) in meeting.event.implementations" :key="implementation.id" class="form-check">
                <!-- Add project -->
                <input v-if="!implementation.meeting" v-model="implementation.meeting" @click.prevent="addProjectToMeeting(key)" type="checkbox" class="form-check-input"></input>
                
                <!--Delete project -->
                <input v-if="implementation.meeting" v-model="implementation.meeting" @click.prevent="removeProjectToMeeting(key)" type="checkbox" class="form-check-input">{{implementation.project.name}}</input>
            </label>
            <input type="button" name="previous" class="previous action-button" value="Previous" />
            <input type="button" name="next" class="next action-button" value="Next" />
        </fieldset>
        <!-- Display choosed project -->
        <div v-for="(implementation, key) in meetingProjects" :key="implementation.id">
            <h1>{{implementation.project.name}}</h1>
            <p>{{implementation.project.description}}</p>
            <form action="">
                <label for="comment">Commentaire</label>
                <textarea name="comment" id="comment" cols="30" rows="10"></textarea>
                <label for="score">Côte</label>
                <input type="number" name="score" id="score">
            </form>
        </div>
        <!-- Global comment -->
        <form action="">
            <label for="comment">Commentaire global</label>
            <textarea name="comment" id="comment" cols="30" rows="10"></textarea>
            <label for="score">Côte général</label>
            <input type="number" name="score" id="score">
        </form>
        
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
    data(){
        return{
            projectsIds: [],
        }
    },
    computed: {
        ...mapGetters([
            'meeting',
            'meetingProjects'
        ])
    },
    methods: {
        ...mapMutations([
            'addProjectToMeeting',
            'removeProjectToMeeting'
        ])
    },
    created(){
        // Meeting datas recupeartion
        this.$store.dispatch('setMeeting', {id: this.id, studentId: this.studentId})
    },
    
}
</script>
