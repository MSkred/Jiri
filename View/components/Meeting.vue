<template>
    <div class="container">
        <h1>Meeting avec {{meeting.student.name}} </h1>
        <form action="">
            <label for="project">Sélectionnez les projets</label>
            <md-switch v-for="implementation in meeting.event.implementations" v-model="implementation.meeting" class="md-primary">
                        {{implementation.project.name}}
            </md-switch>
            <!-- Display choosed project -->
            <div v-for="(implementation, key) in meeting.event.implementations" v-if="implementation.meeting" :key="implementation.id">
                <h1>{{implementation.project.name}}</h1>
                <p>{{implementation.project.description}}</p>
                <md-field>
                    <label for="comment">Commentaire</label>
                    <md-textarea v-model="implementation.score.comment" md-counter="256" name="comment" id="comment"></md-textarea>
                </md-field>
                <md-field>
                    <label for="score">Côte</label>
                    <md-input type="number" v-model="implementation.score.score" id="score" name="score" step="0.5"></md-input>
                    <span class="md-helper-text">La côte golbale doit être un nombre entre 0 et 20</span>
                </md-field>
            </div>
            <!-- Global comment -->
            <md-field>
                <label for="comment">Commentaire globale</label>
                <md-textarea v-model="global.comment" md-counter="256" name="comment" id="comment"></md-textarea>
            </md-field>
            <md-field>
                <label for="score">Côte globale</label>
                <md-input type="number" v-model="global.score" id="score" name="score" step="0.5"></md-input>
                <span class="md-helper-text">La côte golbale doit être un nombre entre 0 et 20</span>
            </md-field>
            <md-button @click.prevent="validateMeeting" class="md-raised md-primary">
                Valider le meeting
            </md-button>
        </form>
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
                let eventIds = this.eventId;
                Bus.$emit('createScore', {meetingId, softDelete, implementationId, comment, score, eventIds});

                
                //this.$router.push({name: `event`})
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
