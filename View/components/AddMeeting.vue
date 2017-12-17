<template>
    <div class="container">
        <h1>Créer un meeting</h1>
        <form id="msform">
            <fieldset>
                <h2 class="fs-title">Choisissez un étudiant</h2>
                <h3 class="fs-subtitle">Ceci est l'étape 1</h3>
                <label for="students">Sélectionnez un étudiant</label>
                <select name="students" id="students" v-model="studentId">
                    <option value="null">Aucun étudiant sélectionné</option>
                    <option v-for="(student, key) in event.students" :value="student.id">{{student.name}}</option>
                </select>
            </fieldset>
            <fieldset>
                <h2 class="fs-title">Ajoutez les projets</h2>
                <h3 class="fs-subtitle">Ceci est l'étape 2</h3>
                <label for="project">Sélectionnez les projets</label>
                <label v-for="(project, key) in event.projects" :key="project.id" class="form-check">
                    <!-- Add project -->
                    <input v-if="!project.meeting" @click.prevent="addProjectToMeeting(key)" v-model="project.meeting" type="checkbox" class="form-check-input"></input>
                    
                    <!--Delete project -->
                    <input v-if="project.meeting" @click.prevent="removeProjectToMeeting(key)" v-model="project.meeting" type="checkbox" class="form-check-input">{{project.name}}</input>
                </label>
                <input type="button" name="previous" class="previous action-button" value="Previous" />
                <input type="button" name="next" class="next action-button" value="Next" />
            </fieldset>
            <button @click.prevent="startMeeting">Commencez le meeting</button>
        </form>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import { CREATE_MEETING_MUTATION } from '../constants/MeetingsCreate.gql'
export default {
    name: 'add-meeting',
    props: ['id'], 
    data(){
        return{
            softDelete: false,
            studentId: null,
            projectsIds: [],
            authorId: null,
            currentMeeting: null,
            currentStudent: null,
        }
    },
    computed: {
        ...mapGetters([
            'userId',
            'event',
            'meeting',
            'meetingProjects'
        ])
    },
    methods: {
        ...mapMutations([
            'addProjectToMeeting',
            'removeProjectToMeeting',
        ]),
        startMeeting(){
            // Push project ID in new array
            this.meetingProjects.map( project => {
                let projectId = project.id
                this.projectsIds.push(projectId)
            })

            // Get user & event ID and assign it
            this.authorId = this.userId
            this.eventId = this.event.id

            //Create meeting
            const { studentId, softDelete, authorId, eventId } = this;
            this.$apollo.mutate({
                mutation: CREATE_MEETING_MUTATION,
                variables: {
                    softDelete,
                    studentId,
                    authorId,
                    eventId
                }
            }).then(data => {
                //console.log(data.data.createMeeting)
                this.currentMeeting = data.data.createMeeting.id
                this.$store.commit('meeting', data.data.createMeeting)
                //this.$store.commit('meetingStudent', data.data.createMeeting.student)
                location.assign(`/event/${this.event.id}/meeting/${this.currentMeeting}/student/${this.studentId}`)
                console.log('Done meeting creation')
            }).then(data => {
            }).catch(error => {
                console.log('---meeting creation failed'  + error)
            });
        }
    },
    created(){
        // Event recupeartion
        this.$store.dispatch('setEvent', this.id);
    }
}
</script>

