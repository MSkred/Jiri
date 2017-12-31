<template>
    <div class="wrapper">
        <section class="hero is-link">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Dashboard
                    </h1>
                    <h2 class="subtitle">
                        Bonjour {{currentUser.name}} vous êtes connecté en tant <span v-if="currentUser.isAdmin">que administrateur</span><span v-else>qu'utilisateur</span>
                    </h2>
                </div>
            </div>
        </section>
        <h2>Les événements auquel vous participez</h2>
        <div class="papa">
            <div v-for="(event, key) in currentUser.juryEvents" class="enfant">
                <router-link :to="{name: 'event', params: {id: event.id}}" :href="`/event/${event.id}`" class="contenu">
                    <div class="flex">
                        <div class="flex__header">
                            <h1 class="title">{{event.courseName}}</h1>
                            <p class="subtitle">{{event.academicYear}}</p>
                        </div>
                        <div class="flex__content">
                            <p></p>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <h2>Les meeting que vous avez effectué</h2>
        <div class="papa">
            <div v-for="(meeting, key) in currentUser.meetings" class="enfant">
                <div class="contenu">
                    <div class="flex">
                        <div class="flex__header">
                            <h1 class="title">{{meeting.student.name}}</h1>
                            <p class="subtitle">{{meeting.evaluation}} / 20</p>
                        </div>
                        <div class="flex__content">
                            <p>{{meeting.event.courseName}} de {{meeting.event.academicYear}}</p>
                            <p>{{meeting.comment}}</p>
                        </div>
                        <div class="flex__footer">
                            <button class="modify"  @click.prevent="showModifyModal = true; setModifyData(meeting)">Modifier</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <modify v-if="showModifyModal" >
            <h3 slot="header">Modifier le meeting avec XXX</h3>
            <form slot="body">
                <div v-for="(score, key) in modalItem.scores" :key="score.id" :id="key">
                        <h4>{{score.implementation.project.name}}</h4>
                        <label for="comment">Commentaire</label>
                        <textarea :value="score.comment" name="comment" id="comment" cols="30" rows="10"></textarea>
                        <label for="score">Côte</label>
                        <input :value="score.score" type="number" name="score" id="score">
                </div>
                
                <div>
                    <form action="">
                        <h4>Le commentaire globale de {{modalItem.student.name}}</h4>
                        <label for="globalComment">Commentaire</label>
                        <textarea :value="modalItem.comment" name="globalComment" id="globalComment" cols="30" rows="10"></textarea>
                        <label for="globalScore">Côte</label>
                        <input :value="modalItem.evaluation" type="number" name="globalScore" id="globalScore">
                    </form>
                </div>
            </form>
            <div slot="footer">
                <button @click.prevent="modifyMeeting(modalItem.id)">Modifier</button>
                <button @click.prevent="showModifyModal = false">Annuler</button>
            </div>
        </modify>
    </div>
</template>


<script>  
import { USER_QUERY } from '../constants/User.gql'
import {mapGetters, mapMutations} from 'vuex'
import Modify from './Modify.vue';
import {Bus} from '../Bus'

export default {
  name: 'home',
    components: {
        Modify
    },
  data(){
    return{
        currentUser: {},
        showModifyModal: false,
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
            // Use vue reactive properties
            return {
                id: this.userId,
            }
        },
        update(data){
            //console.log(data)
            console.log('User data get done')
            return data.User
        }
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