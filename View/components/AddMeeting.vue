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
            <!-- <fieldset>
                <h2 class="fs-title">Ajoutez les projets</h2>
                <h3 class="fs-subtitle">Ceci est l'étape 2</h3>
                <label for="project">Sélectionnez les projets</label>
                <label v-for="(project, key) in event.projects" :key="project.id" class="form-check">
                    Add project
                    <input v-if="!project.meeting" @click.prevent="addProjectToMeeting(key)" v-model="project.meeting" type="checkbox" class="form-check-input"></input>
                    
                   Delete project
                    <input v-if="project.meeting" @click.prevent="removeProjectToMeeting(key)" v-model="project.meeting" type="checkbox" class="form-check-input">{{project.name}}</input>
                </label>
                <input type="button" name="previous" class="previous action-button" value="Previous" />
                <input type="button" name="next" class="next action-button" value="Next" />
            </fieldset> -->
            <button @click.prevent="startMeeting">Commencez le meeting</button>
        </form>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

import { SINGLE_EVENT_QUERY } from '../constants/Event.gql'
import {Bus} from '../Bus'
export default {
    name: 'add-meeting',
    props: ['id'], 
    data(){
        return{
            softDelete: false,
            studentId: null,
            authorId: null,
            currentMeeting: null,
            currentStudent: null,
            event: [],
        }
    },
    apollo: {
        event: {
            query: SINGLE_EVENT_QUERY,
            variables() {
                // Use vue reactive properties
                return {
                    id: this.id,
                }
            },
            update(data){
                return data.allEvents[0]
            }
        },
    },
    computed: {
        ...mapGetters([
            'userId',
        ])
    },
    methods: {
        startMeeting(){
            // Defined author and event ID
            this.authorId = this.userId
            this.eventId = this.event.id

            // Defined currentMeeting ID
            this.currentMeeting = this.lastAddedId
            
            let { studentId, softDelete, authorId, eventId } = this; 
            Bus.$emit('startMeeting', { studentId, softDelete, authorId, eventId });    
        }
    },
}
</script>

