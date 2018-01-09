<template>
    <div class="wrapper">
        <section class="hero is-link">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Tous les événements
                    </h1>
                    <h2 class="subtitle">
                        <router-link :to="{name: 'addEvent'}" :href="`/addEvent`">
                            <md-button class="md-raised">Ajouter un événement</md-button>
                        </router-link>
                    </h2>
                </div>
            </div>
        </section>
        <scale-loader v-if="isLoading" color="#448aff" style="height: 90vh;"></scale-loader>
        <template v-else>
            <ui-alert @dismiss="showAlert = false" v-if="this.feedbackItem" v-show="showAlert" :type="this.feedbackItem.type">
                {{this.feedbackItem.message}}
            </ui-alert>
            <md-empty-state
                v-if="events <= [0]"
                md-icon="event"
                md-label="Aucun événement"
                md-description="Aucun évnément n'a encore été ajouter."
                class="tabsIsEmpty">
                <router-link :to="{name: 'addEvent'}" :href="`/addEvent`">
                    <md-button class="md-raised md-primary">Ajouter un événement</md-button>
                </router-link>
            </md-empty-state>
            <div v-else class="md-layout papa">
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

                    <md-dialog v-if="showDesactivateModal" :md-active.sync="showDesactivateModal" >
                        <md-dialog-title>
                            Voullez-vous vraiment désactiver {{modalItem.courseName}} de {{modalItem.academicYear}} ?
                        </md-dialog-title>
                        <md-dialog-action class="md-dialog-title md-title">
                            <md-button @click.prevent="desactivateEvent(modalItem.id)" class="md-accent">
                                Désactiver
                            </md-button>
                            <md-button @click.prevent="showDesactivateModal = false" class="md-raised md-primary">
                                Annuler           
                            </md-button>
                        </md-dialog-action>
                    </md-dialog>
                    <md-dialog v-if="showModifyModal" :md-active.sync="showModifyModal" >
                        <md-dialog-title>
                            Voullez-vous vraiment modifier {{modalItem.courseName}} de {{modalItem.academicYear}} ?
                        </md-dialog-title>
                        <md-dialog-action class="md-dialog-title md-title">
                            <md-button @click.prevent="editEvent(modalItem.id)" class="md-raised md-primary">
                                Modifier
                            </md-button>
                            <md-button @click.prevent="showModifyModal = false" class="md-accent">
                                Annuler           
                            </md-button>
                        </md-dialog-action>
                    </md-dialog>
            </div>
        </template>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

import {Bus} from '../Bus'

import { USER_QUERY } from '../constants/User.gql'
import { ALL_EVENT_QUERY } from '../constants/EventsAll.gql'
import { UiAlert } from 'keen-ui';
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
export default {
    name: 'events',
    components: {
        UiAlert,
        ScaleLoader,
    },
    data(){
        return{
            showDesactivateModal: false,
            showModifyModal: false,
            events: [],
            currentUser: {},
            isLoading: 0,
            showAlert: false,
            feedback: null,
        }
    },
    apollo: {
        events: {
            query: ALL_EVENT_QUERY,
            update(data){
                return data.allEvents
            },
            loadingKey: 'isLoading',
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
                return data.User
            },
        }
    },
    computed: {
        ...mapGetters([
            'modalItem',
            'userId',
            'feedbackItem',
            'showSpecialAlert'
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
    created(){
        this.showAlert = this.showSpecialAlert;
    }
}
</script>
