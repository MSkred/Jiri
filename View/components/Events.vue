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
      <div class="papa">
            <div v-for="(event, key) in events" class="enfant">
                <router-link :to="{name: 'event', params: {id: event.id}}" :href="`/event/${event.id}`" class="contenu">
                    <div class="flex" v-if="!event.softDelete">
                        <div class="flex__header">
                            <h2 class="title">{{event.courseName}}</h2>
                            <p class="subtitle">{{event.academicYear}}</p>
                        </div>
                        <div class="flex__content">
                            <p class="jurys">{{event.jurys.length}} jurys</p>
                            <p class="students">{{event.students.length}} étudiants</p>
                        </div>
                        <div class="flex__footer" v-if="currentUser.isAdmin">
                            <button class="modify"  @click.prevent="showModifyModal = true; setModifyData(event)">Modifier</button>
                            <button id="show-modal" @click.prevent="showDesactivateModal = true; setDesactivateData(event)">Désactiver</button>
                        </div>
                    </div>
                </router-link>
            </div>
            <desactivate v-if="showDesactivateModal && currentUser.isAdmin" >
                    <h3 slot="header">Voullez-vous vraiment désactiver {{modalItem.courseName}} de {{modalItem.academicYear}}</h3>
                    <div slot="footer">
                        <button @click.prevent="desactivateEvent(modalItem.id)">Désactiver</button>
                        <button @click.prevent="showDesactivateModal = false">Annuler</button>
                    </div>
            </desactivate>  
      </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import Desactivate from './Desactivate.vue';
import {Bus} from '../Bus'

import { USER_QUERY } from '../constants/User.gql'
import { ALL_EVENT_QUERY } from '../constants/EventsAll.gql'
export default {
    name: 'events',
    components: {
        Desactivate,
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
