<template>
    <div class="wrapper">
        <section class="hero is-link">
            <div class="hero-body">
                <div class="container">
                <h1 class="title">
                    Tous les événements
                </h1>
                <h2 class="subtitle">
                    Primary subtitle
                </h2>
                </div>
            </div>
        </section>
      <div class="md-layout papa">
            <div v-for="(event, key) in events" class="enfant">
                <router-link :to="{name: 'event', params: {id: event.id}}" :href="`/event/${event.id}`" class="contenu">
                    <md-card class="md-primary" md-with-hover>
                        <md-ripple>
                            <md-card-header>
                                <div class="md-title">{{event.courseName}}</div>
                                <div class="md-subhead">{{event.academicYear}}</div>
                            </md-card-header>
                            <md-card-content>
                                <p class="jurys">{{event.jurys.length}} jurys</p>
                                <p class="students">{{event.students.length}} étudiants</p>
                                <p class="projects">{{event.projects.length}} projets</p>
                            </md-card-content>
                            <md-card-actions>
                                <md-button @click.prevent="showModifyModal = true; setModifyData(event)">Modifier</md-button>
                                <md-button @click.prevent="showDesactivateModal = true; setDesactivateData(event)">Désactiver</md-button>
                            </md-card-actions>
                        </md-ripple>
                    </md-card>
                </router-link>
            </div>
            <desactivate v-if="showDesactivateModal && currentUser.isAdmin" >
                    <h3 slot="header">Voullez-vous vraiment désactiver {{modalItem.courseName}} de {{modalItem.academicYear}}</h3>
                    <div slot="footer">
                        <md-button @click.prevent="desactivateEvent(modalItem.id)" class="md-accent">
                            Désactiver
                        </md-button>
                        <md-button @click.prevent="showDesactivateModal = false" class="md-raised md-primary">
                            Annuler           
                        </md-button>
                    </div>
            </desactivate>  
            <modify v-if="showModifyModal" >
                <h3 slot="header">Voullez-vous vraiment modifier {{modalItem.courseName}} de {{modalItem.academicYear}}</h3>
                <div slot="body">Vous allez être dirigé vers la page de modification d'événement</div>
                <div slot="footer">
                    <md-button @click.prevent="editEvent(modalItem.id)" class="md-raised md-primary">
                        Modifier
                    </md-button>
                    <md-button @click.prevent="showModifyModal = false" class="md-accent">
                        Annuler           
                    </md-button>
                </div>
            </modify>
      </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import Desactivate from './Desactivate.vue';
import Modify from './Modify.vue';

import {Bus} from '../Bus'

import { USER_QUERY } from '../constants/User.gql'
import { ALL_EVENT_QUERY } from '../constants/EventsAll.gql'
export default {
    name: 'events',
    components: {
        Desactivate,
        Modify
    },
    data(){
        return{
            showDesactivateModal: false,
            showModifyModal: false,
            events: [],
            currentUser: {},
        }
    },
    apollo: {
        events: {
            query: ALL_EVENT_QUERY,
            update(data){
                return data.allEvents
            }
        },
        currentUser: {
            query: USER_QUERY,
            variables() {
                // Use vue reactive properties
                return {
                    id: this.userId,
                }
            },
            update(data){
                console.log('User data get done')
                return data.User
            }
        }
    },
    computed: {
        ...mapGetters([
            'modalItem',
            'userId'
        ])
    },  
    methods: {
        editEvent(eventId){
          location.assign(`/editEvent/${eventId}`)  
        },

        ...mapMutations([
            'setDesactivateData',
            'setModifyData'
        ]),
        desactivateEvent(eventId){
            Bus.$emit('desactivateEvent', eventId);

            // Close the modify modal
            this.showDesactivateModal = false;
        }
    },
}
</script>
