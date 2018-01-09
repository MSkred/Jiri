<template>
    <div class="wrapper">
        <section class="hero is-link">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Dashboard
                    </h1>
                    <h2 class="subtitle">
                        Bonjour {{currentUser.name}} vous êtes connecté en tant <span v-if="currentUser.isAdmin">que administrateur.</span><span v-else>qu'utilisateur</span>
                    </h2>
                </div>
            </div>
        </section>
        <scale-loader v-if="isLoading" color="#448aff" style="height: 90vh;"></scale-loader>
        <template v-else>
            <md-tabs>
                <md-tab md-label="Mes événements">
                    <md-empty-state
                        v-if="currentUser.juryEvents <= [0]"
                        md-icon="event"
                        md-label="Aucun événement"
                        md-description="Vous ne participez à aucun événement"
                        class="tabsIsEmpty">
                    </md-empty-state>
                    <div v-else class="md-layout papa">
                        <div v-for="(event, key) in currentUser.juryEvents" class="enfant">
                            <router-link :to="{name: 'event', params: {id: event.id}}" :href="`/event/${event.id}`" class="contenu">
                                <md-card class="md-primary" md-with-hover>
                                    <md-ripple>
                                        <md-card-header>
                                            <div class="md-title">{{event.courseName}}</div>
                                            <div class="md-subhead">{{event.academicYear}}</div>
                                        </md-card-header>
                                    </md-ripple>
                                </md-card>
                            </router-link>
                        </div>
                    </div>
                </md-tab>
                <md-tab md-label="Mes meetings">
                    <md-empty-state
                        v-if="currentUser.meetings <= [0]"
                        md-icon="people"
                        md-label="Aucun meeting"
                        md-description="Vous n'avez pas encore de meeting."
                        class="tabsIsEmpty">
                    </md-empty-state>
                    <div v-else class="md-layout papa">
                        <div v-for="(meeting, key) in currentUser.meetings" class="enfant">
                            <div class="contenu">
                                <md-card class="md-primary" md-with-hover>
                                    <md-ripple>
                                        <md-card-header>
                                            <div class="md-title">{{meeting.student.name}}</div>
                                            <div class="md-subhead">Côte globale de {{meeting.evaluation}}/20</div>
                                        </md-card-header>
                                        <md-card-content>
                                            <p>{{meeting.event.courseName}} de {{meeting.event.academicYear}}</p>
                                            <p>{{meeting.comment}}</p>
                                        </md-card-content>
                                        <md-card-actions>
                                            <md-button @click.prevent="showMeetingModal = true; setModifyData(meeting)">Voir le meeting</md-button>
                                            <md-button @click.prevent="showModifyModal = true; setModifyData(meeting)">Modifier</md-button>
                                        </md-card-actions>
                                    </md-ripple>
                                </md-card>
                            </div>
                        </div>
                    </div>
                </md-tab>
            </md-tabs>
        </template>
        <div v-if="showModifyModal">
            <md-dialog :md-active.sync="showModifyModal">
                <md-dialog-title>Modifier le meeting avec {{modalItem.student.name}}</md-dialog-title>
                <md-tabs md-dynamic-height >
                    <md-tab v-for="(score, key) in modalItem.scores" :id="key" :md-label="score.implementation.project.name">
                        <md-field>
                            <label for="comment">Commentaire</label>
                            <md-textarea :value="score.comment" md-counter="256" name="comment" id="comment"></md-textarea>
                        </md-field>
                        <md-field>
                            <label for="score">Côte</label>
                            <md-input type="number" :value="score.score" id="score" name="score" step="0.5" min="0" max="20"
                                data-vv-as="Le champs côte global" 
                                data-vv-validate-on="blur"
                                v-validate="'required|min_value:0|max_value:20'"></md-input>
                            <span class="md-helper-text">La côte golbale doit être un nombre entre 0 et 20</span>
                        </md-field>
                    </md-tab>
                    <md-tab md-label="Global">
                        <md-field>
                            <label for="globalComment">Commentaire</label>
                            <md-textarea :value="modalItem.comment" md-counter="256" name="globalComment" id="globalComment"></md-textarea>
                        </md-field>
                        <md-field>
                            <label for="globalScore">Côte</label>
                            <md-input type="number" :value="modalItem.evaluation" id="globalScore" name="globalScore" step="0.5" min="0" max="20"
                                data-vv-as="Le champs côte global" 
                                data-vv-validate-on="blur"
                                v-validate="'required|min_value:0|max_value:20'"></md-input>
                            <span class="md-helper-text">La côte golbale doit être un nombre entre 0 et 20</span>
                        </md-field>
                    </md-tab>
                </md-tabs>
                <md-dialog-actions class="md-dialog-title md-title">
                    <md-button class="md-primary" @click="showModifyModal = false">Fermer</md-button>
                    <md-button class="md-primary" @click="modifyMeeting(modalItem.id)">Sauvegarder les modifications</md-button>
                </md-dialog-actions>
            </md-dialog>
        </div>
        <div v-if="showMeetingModal">
            <md-dialog :md-active.sync="showMeetingModal">
                <md-dialog-title>Meeting avec {{modalItem.student.name}}</md-dialog-title>
                <md-tabs md-dynamic-height >
                    <md-tab v-for="score in modalItem.scores" :md-label="score.implementation.project.name">
                        <h3>Commentaire</h3>
                        <p>{{score.comment}}</p>
                        <h3>Côte</h3>
                        <p>{{score.score}}</p>
                    </md-tab>
                    <md-tab md-label="Global">
                        <h3>Commentaire global</h3>
                        <p>{{modalItem.comment}}</p>
                        <h3>Côte global</h3>
                        <p>{{modalItem.evaluation}}</p>
                    </md-tab>
                </md-tabs>
                <md-dialog-actions class="md-dialog-title md-title">
                    <md-button class="md-primary" @click="showMeetingModal = false">Fermer</md-button>
                    <md-button class="md-accent" @click="showModifyModal = true; showMeetingModal = false">Modifier</md-button>
                </md-dialog-actions>
            </md-dialog>
        </div>
    </div>
</template>


<script>  
import { USER_QUERY } from '../constants/User.gql'
import {mapGetters, mapMutations} from 'vuex'
import {Bus} from '../Bus'

export default {
  name: 'home',
  data(){
    return{
        currentUser: {},
        showModifyModal: false,
        showMeetingModal: false,
        isLoading: 0,   
    }
  },
  computed: {
    ...mapGetters([
        'modalItem',
        'userId',
    ])
  },
  apollo: {
    currentUser: {
      query: USER_QUERY,
        variables() {
            return {
                id: this.userId,
            }
        },
        update(data){
            return data.User
        },
        loadingKey: 'isLoading',
    }
  },
  methods: {
        ...mapMutations([
            'setModifyData'
        ]),
        modifyMeeting(meetingId){
            let id = meetingId,
                comment = document.getElementById('globalComment').value,
                evaluation = parseFloat( document.getElementById('globalScore').value );
            
            Bus.$emit('validateMeeting', { id, comment, evaluation });


            // Loop on all scores and get ID element with i
            var i = 0;
            this.modalItem.scores.forEach(scoore => {

                // Get data in var
                let id = scoore.id,
                    comment = document.getElementById(i).querySelector('#comment').value,
                    score = parseFloat( document.getElementById(i).querySelector('#score').value );
                    
                    // Event bus with data on argument
                    Bus.$emit('updateScore', { id, comment, score });
                
                // Increment 
                i++;
            });            

            // Close the modify modal
            this.showModifyModal = false;
        }
  }
}
</script>