<template>
    <div class="wrapper">
        <section class="hero is-link">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Créer un meeting
                    </h1>
                    <h2 class="subtitle">
                        Bonjour {{currentUser.name}} vous êtes connecté en tant <span v-if="currentUser.isAdmin">que administrateur</span><span v-else>qu'utilisateur</span>
                    </h2>
                </div>
            </div>
        </section>
        <scale-loader v-if="isLoading" color="#448aff" style="height: 90vh;"></scale-loader>
        <template v-else>
            <form>
                <md-field>
                    <label for="students">Sélectionnez un étudiant</label>
                    <md-select name="students" id="students" v-model="studentId">
                        <md-option v-for="(student, key) in event.students" :value="student.id">{{student.name}}</md-option>
                    </md-select>
                </md-field>
                <md-button @click.prevent="startMeeting" class="md-raised md-primary">
                    Commencez le meeting
                </md-button>
            </form>
        </template>
    </div>
</template>

<script>
import {Bus} from '../Bus'
import {mapGetters, mapMutations} from 'vuex'
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import { SINGLE_EVENT_QUERY } from '../constants/Event.gql'
import { USER_QUERY } from '../constants/User.gql'
export default {
    name: 'add-meeting',
    props: ['id'], 
    components: {
        ScaleLoader,
    },
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
                return {
                    id: this.id,
                }
            },
            update(data){
                return data.allEvents[0]
            }
        },
        currentUser: {
        query: USER_QUERY,
            variables() {
                return {
                    id: this.userId,
                }
            },
            update(data){
                return data.User
            }
        }
    },
    computed: {
        ...mapGetters([
            'userId',
            'isLoading'
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

