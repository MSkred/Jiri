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
        <div v-for="(implementation, key) in meeting.event.implementations" v-if="implementation.meeting" :key="implementation.id">
            <h1>{{implementation.project.name}}</h1>
            <p>{{implementation.project.description}}</p>
            <form action="">
                <label for="comment">Commentaire</label>
                <textarea v-model="implementation.score.comment" name="comment" id="comment" cols="30" rows="10"></textarea>
                <label for="score">Côte</label>
                <input v-model="implementation.score.score" type="number" name="score" id="score">
            </form>
        </div>
        <!-- Global comment -->
        <form action="">
            <label for="comment">Commentaire global</label>
            <textarea v-model="global.comment" name="comment" id="comment" cols="30" rows="10"></textarea>
            <label for="score">Côte général</label>
            <input v-model="global.score" type="number" name="score" id="score">
        </form>
        <button @click.prevent="validateMeeting">Valider le meeting</button>
    </div>
</template>

<script>

import { SINGLE_MEETING_QUERY } from '../constants/Meeting.gql'
import {mapGetters, mapMutations} from 'vuex'
import {Bus} from '../Bus'
import { store } from '../store'
export default {
    name: 'Meeting',
    props: [
        'id',
        'eventId',
        'studentId'
    ],
    data(){
        return{
            scores: [],
            softDelete: false,
            implementations: [],
            global: {
                comment: null,
                score: null,
            },
            meeting: [],
        }
    },
    apollo: {
        meeting: {
            query: SINGLE_MEETING_QUERY,
            variables() {
                // Use vue reactive properties
                return {
                    id: this.id,
                    eventId: this.eventId
                }
            },
            update(data){
                console.log(data)
                // Added meeting boolean
                var implementations = [];
                var newMeeting = [];
                var newStudent = new Object();

                // // Get all data in var
                var id = data.allMeetings[0].id
                var student = data.allMeetings[0].student

                // // Adding meeting key in my object
                student.implementations.map( implementation => {
                    let id = implementation.id
                    let project = implementation.project
                    implementations.push({ id: id, project: project, meeting: false, score: { comment: null, score: null } })
                } )
                newStudent = ({ id: id, implementations: implementations})
                
                // // Create new meeting with projects meeting key
                newMeeting = ({ id, student, event: newStudent })

                return newMeeting
            }
        },
    },
    computed: {
        ...mapGetters([
            'meetingProjects',
            'lastAddedId',
            'userId'
        ])
    },
    methods: {
        addProjectToMeeting(key) {
            let meetingProjects = store.state.meetingProjects;
            if (!this.meeting.event.implementations[key].meeting) {
                this.meeting.event.implementations[key].meeting = true;
            }
        },
        removeProjectToMeeting(key) {
            let meetingProjects = store.state.meetingProjects;
            if (this.meeting.event.implementations[key].meeting) {
                this.meeting.event.implementations[key].meeting = false;
            }
        },
        validateMeeting(){
            
            // Generate Score array
            this.meeting.event.implementations.map( implementation => {
                if(implementation.meeting){
                    let implementationId = implementation.id;
                    let comment = implementation.score.comment;
                    let score = implementation.score.score
                    this.scores.push({implementationId: implementationId, comment:comment, score: score})
                }
            } )

            // Loop on score array and create all score data
            this.scores.forEach(scoore => {
                let meetingId = this.id;
                let softDelete = this.softDelete;
                let implementationId = scoore.implementationId;
                let comment = scoore.comment;
                let score = parseFloat(scoore.score);
                
                Bus.$emit('createScore', {meetingId, softDelete, implementationId, comment, score});

                
                this.$router.push({name: `event`})
            });

            // Update meeting with comment & evaluation
            let comment = this.global.comment,
                evaluation = parseFloat(this.global.score),
                id = this.id;

            Bus.$emit('validateMeeting', {id, comment, evaluation});
        }
    },
    
}
</script>
