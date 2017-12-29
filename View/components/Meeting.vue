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

import { CREATE_SCORE_MUTATION } from '../constants/ScoresCreate.gql'
import { SINGLE_MEETING_QUERY } from '../constants/Meeting.gql'
import {mapGetters, mapMutations} from 'vuex'
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
                    studentId: this.studentId
                }
            },
            update(data){

                // Added meeting boolean
                var implementations = [];
                var newMeeting = [];
                var newEvent = new Object();

                // Get all data in var
                var id = data.allMeetings[0].id
                var student = data.allMeetings[0].student
                var event = data.allMeetings[0].event

                // Adding meeting key in my object
                event.implementations.map( implementation => {
                    let id = implementation.id
                    let project = implementation.project
                    implementations.push({ id: id, project: project, meeting: false, score: { comment: null, score: null } })
                } )
                newEvent = ({ id: id, implementations: implementations})
                
                // Create new meeting with projects meeting key
                newMeeting = ({ id, student, event: newEvent })

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
                //meetingProjects.push(this.meeting.event.implementations[key]);
            }
        },
        removeProjectToMeeting(key) {
            let meetingProjects = store.state.meetingProjects;
            if (this.meeting.event.implementations[key].meeting) {
                this.meeting.event.implementations[key].meeting = false;
            }
            // var i = 0;
            // this.meeting.event.implementations.forEach(implementation => {
            //     if (!implementation.meeting) {
            //         meetingProjects.splice(i, 1)
            //     }
            //     i++;
            // });
        },
        validateMeeting(){
            // Puse ID on implementation in new array
            this.meetingProjects.map( project => {
                let implementationId = project.id;
                let comment = project.score.comment;
                let score = project.score.score
                this.scores.push({implementationId: implementationId, comment: comment, score: score})
            } )
            this.scores.forEach(scoore => {
                let meetingId = this.id;
                let softDelete = this.softDelete;
                let implementationId = scoore.implementationId;
                let comment = scoore.comment;
                let score = parseFloat(scoore.score);
                this.$apollo.mutate({
                    mutation: CREATE_SCORE_MUTATION,
                    variables:{
                        meetingId,
                        softDelete,
                        implementationId,
                        comment,
                        score,
                    },
                }).then(data => {
                    console.log('Done score creation.');
                }).catch(error => {
                    console.log('---Score creation failed ' + error)
                });
            });
        }
    },
    
}
</script>
