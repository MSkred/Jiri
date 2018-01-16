<style lang="sass" scoped>
.successful
    background: #009688 !important
.missed
    background: #F44336 !important
</style>

<template>
    <div class="wrapper">
        <section class="hero is-link">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        {{event.courseName}}
                    </h1>
                    <h2 class="subtitle">
                        {{event.academicYear}}
                    </h2>
                    <router-link :to="{name: 'addMeeting', params: {id: id}}" :href="`/event/${id}/addMeeting`">
                        <md-button class="md-raised">Commencer un meeting</md-button>
                    </router-link>
                </div>
            </div>
        </section>
        <ui-alert @dismiss="showAlert = false" v-if="this.feedbackItem" v-show="showAlert" :type="this.feedbackItem.type">
            {{this.feedbackItem.message}}
        </ui-alert>
        <scale-loader v-if="isLoading" color="#448aff" style="height: 90vh;"></scale-loader>
        <md-tabs v-else>
            <md-tab md-label="Jurys">
                <md-empty-state
                    v-if="event.jurys <= [0]"
                    md-rounded
                    md-icon="account_circle"
                    md-label="Aucun jury"
                    md-description="Aucun jury participe à cette événement, éditez l'événement pour pouvoir en ajouter.">
                </md-empty-state>
                <div v-else class="md-layout papa">
                    <div class="enfant" v-for="(jury, key) in event.jurys">
                        <router-link class="contenu" :to="{name: 'user', params: {id: jury.id}}" :href="`/user/${jury.id}`">
                            <md-card class="md-primary" md-with-hover>
                                <md-ripple>
                                    <md-card-header>
                                        <div class="md-title">{{jury.name}}</div>
                                        <div class="md-subhead">{{jury.company}}</div>
                                    </md-card-header>
                                    <md-card-content>
                                        <p>{{jury.email}}</p>
                                    </md-card-content>
                                </md-ripple>
                            </md-card>
                        </router-link>
                    </div>
                </div>
            </md-tab>
            <md-tab md-label="Étudiants">
                <md-empty-state
                    v-if="event.students <= [0]"
                    md-rounded
                    md-icon="face"
                    md-label="Aucun étudiant"
                    md-description="Aucun étudiant participe à cette événement, éditez l'événement pour pouvoir en ajouter.">
                </md-empty-state>
                <div v-else class="md-layout papa">
                    <div class="enfant" v-for="(student, key) in event.students" >
                        <router-link class="contenu" :to="{name: 'student', params: {id: student.id}}" :href="`/student/${student.id}`">
                            <!-- successful -->
                            <template v-if="student.performances >= [1] && parseFloat(student.performances[0].manualScore) >= parseFloat(10)">
                                <md-card  class="md-primary successful" md-with-hover>
                                    <md-ripple>
                                        <md-card-header>
                                            <div class="md-title">{{student.name}}</div>
                                        </md-card-header>
                                        <md-card-content>
                                            <p v-if="student.performances <= [0]"> <ui-icon icon="warning"></ui-icon> La côte final non validé</p>
                                            <p v-else> <ui-icon icon="check_circle"></ui-icon> Moyenne manuelle: {{student.performances[0].manualScore}}</p>
                                        </md-card-content>
                                        <md-card-actions>
                                            <md-button @click.prevent="showTableScoresModal = true; setModifyData(student)">Voir les résultats</md-button>
                                        </md-card-actions>
                                    </md-ripple>
                                </md-card>
                            </template>
                            <!-- missed -->
                            <template v-if="student.performances >= [1] && student.performances[0].manualScore <= 10">
                                <md-card  class="md-primary missed" md-with-hover>
                                    <md-ripple>
                                        <md-card-header>
                                            <div class="md-title">{{student.name}}</div>
                                        </md-card-header>
                                        <md-card-content>
                                            <p v-if="student.performances <= [0]"> <ui-icon icon="warning"></ui-icon> La côte final non validé</p>
                                            <p v-else> <ui-icon icon="check_circle"></ui-icon> Moyenne manuelle: {{student.performances[0].manualScore}}</p>
                                        </md-card-content>
                                        <md-card-actions>
                                            <md-button @click.prevent="showTableScoresModal = true; setModifyData(student)">Voir les résultats</md-button>
                                        </md-card-actions>
                                    </md-ripple>
                                </md-card>
                            </template>
                            <!-- normal -->
                            <md-card v-if="student.performances <= [0]" class="md-primary" md-with-hover>
                                <md-ripple>
                                    <md-card-header>
                                        <div class="md-title">{{student.name}}</div>
                                    </md-card-header>
                                    <md-card-content>
                                        <p v-if="student.performances <= [0]"> <ui-icon icon="warning"></ui-icon> La côte final non validé</p>
                                        <p v-else> <ui-icon icon="check_circle"></ui-icon> Moyenne manuelle: {{student.performances[0].manualScore}}</p>
                                    </md-card-content>
                                    <md-card-actions>
                                        <md-button @click.prevent="showTableScoresModal = true; setModifyData(student)">Voir les résultats</md-button>
                                    </md-card-actions>
                                </md-ripple>
                            </md-card>
                        </router-link>
                    </div>
                </div>
            </md-tab>
            <md-tab md-label="Projets">
                <md-empty-state
                    v-if="event.projects <= [0]"
                    md-rounded
                    md-icon="computer"
                    md-label="Aucun projet"
                    md-description="Aucun projet participe à cette événement, éditez l'événement pour pouvoir en ajouter.">
                </md-empty-state>
                <div v-else class="md-layout papa">
                    <div v-for="(project, key) in event.projects" class="enfant">
                        <md-card class="md-primary" md-with-hover>
                            <md-ripple>
                                <md-card-header>
                                    <div class="md-title">{{project.name}}</div>
                                </md-card-header>

                                <md-card-content>
                                    <p>{{project.description}}</p>
                                </md-card-content>
                            </md-ripple>
                        </md-card>
                    </div>
                </div>
            </md-tab>
            <md-tab md-label="Meetings">
                <md-empty-state
                    v-if="event.meetings <= [0]"
                    md-rounded
                    md-icon="people"
                    md-label="Aucun meeting"
                    md-description="Aucun meeting n'a encore été valider.">
                </md-empty-state>
                <div v-else class="md-layout papa">
                    <div v-for="(meeting, key) in event.meetings" class="enfant">
                        <div class="contenu">
                            <md-card class="md-primary" md-with-hover>
                                <md-ripple>
                                    <md-card-header>
                                        <div class="md-title">{{meeting.author.name}} & {{meeting.student.name}}</div>
                                        <div class="md-subhead">Côte globale de {{meeting.evaluation}}/20</div>
                                    </md-card-header>
                                    <md-card-content>
                                        <p>{{meeting.comment}}</p>
                                    </md-card-content>
                                </md-ripple>
                            </md-card>
                        </div>
                    </div>
                </div>
            </md-tab>
        </md-tabs>
        <div v-if="showTableScoresModal">
            <md-dialog :md-active.sync="showTableScoresModal">
                <md-dialog-title>Tableau des scores de {{modalItem.name}}</md-dialog-title>
                <md-tabs md-dynamic-height >
                    <md-tab md-label="Tableau">
                        <template v-if="modalItem">
                            <b-card>
                                <table class="table table-hover">
                                    <thead>
                                        <tr class="text-center">
                                            <th scope="col">&nbsp;</th>
                                            <th v-for="implementation in modalItem.implementations" :key="implementation.id" scope="col">{{implementation.project.name}}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(user, key) in users" :key="user.id" :class="'row'+key">
                                                <th scope="row">{{user.name}}</th>
                                                <template v-for="(score, key) in userScores(user.id, id)">
                                                    <td v-if="!editable" class="text-center" :key="score.id">{{score.score}}</td>
                                                    <td v-if="editable" :class="'input'+key">
                                                        <input v-if="score.score == ''" disabled type="number" :data-id="score.id" :value="score.score" name="number">
                                                        <input v-else type="number" :data-id="score.id" :value="score.score" name="number">
                                                    </td>
                                                </template>
                                        </tr>
                                        <tr class="table-info">
                                            <th scope="row">Côtes gloables</th>
                                            <td class="text-center" v-for="implementation in modalItem.implementations" :key="implementation.id" scope="row">
                                                <strong>{{implementationGlobalScore(implementation)}}</strong>
                                            </td>
                                        </tr>
                                    </tbody>

                                </table>
                                <div>
                                    <md-button class="md-primary">Moyenne calculée : {{studentGlobalScore()}}</md-button>
                                    <md-button v-if="!finaleScoreEditable && modalItem.performances <= [0]" class="md-raised md-accent" @click="finaleScoreEditable = true">Valider la moyenne finale</md-button>
                                    <md-button v-if="modalItem.performances > [0]" class="md-accent">Moyenne finale: {{modalItem.performances[0].manualScore}}</md-button>
                                </div>
                                
                            </b-card>
                        </template>
                    </md-tab>
                </md-tabs>
                <md-dialog-actions>
                    <md-button class="md-primary" @click="showTableScoresModal = false; editable = false">Fermer</md-button>
                    <md-button v-if="!editable && modalItem.performances <= [0]" class="md-accent" @click="editable = true">Modifier</md-button>
                    <md-button v-if="editable" class="md-accent" @click="modifyStudentScores(); editable = false">Sauvegarder</md-button>
                </md-dialog-actions>
            </md-dialog>
            <div v-if="finaleScoreEditable">
                <md-dialog :md-active.sync="finaleScoreEditable">
                    <md-dialog-title>Modifier la côte final de {{modalItem.name}}</md-dialog-title>

                <template>
                    <md-tabs md-dynamic-height >
                        <md-tab md-label="Moyenne finale">
                        <md-field v-if="finaleScoreEditable" class="final">
                                <label for="company">Moyenne finale</label>
                                <md-input id="final" @keyup.prevent.enter="finaleScoreEditable = false;" type="number" :value="studentGlobalScore()" max="20" min="0" step="0.5"></md-input>
                            </md-field>
                        </md-tab>
                    </md-tabs>
                </template>
                <md-dialog-actions class="md-dialog-title md-title">
                    <md-button class="md-primary" @click="finaleScoreEditable = false">Fermer</md-button>
                    <md-button class="md-accent" @click="finaleScoreEditable = false; createPerformance()">Valider</md-button>
                </md-dialog-actions>
                </md-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import {Bus} from '../Bus'
import {mapGetters, mapMutations} from 'vuex'
import { SINGLE_EVENT_QUERY } from '../constants/Event.gql'
import { UiIcon, UiAlert } from 'keen-ui';
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import _ from 'lodash'
import nanoid from 'nanoid'

export default {
    name: 'SingleEvent',
    props: ['id'],
    components: {
        UiIcon,
        UiAlert,
        ScaleLoader,
    },
    data(){
        return{
            event: {},
            showTableScoresModal: false,
            editable: false,
            finaleScoreEditable: false,
            showAlert: false,
            isLoading: 0,   
        }
    },
    apollo: {
        event: {
            query: SINGLE_EVENT_QUERY,
            pollInterval: 1000,
            variables() {
                // Use vue reactive properties
                return {
                    id: this.id,
                }
            },
            update(data){
                return data.allEvents[0]
            },
            loadingKey: 'isLoading',
        },
    },
    computed: {
        ...mapGetters([
            'modalItem',
            'feedbackItem',
        ]),
        users(){
            let users = [];
            this.event.students.forEach( student => {
                student.implementations.forEach( implementation => {
                    implementation.scores.forEach(score => {
                        users.push(score.meeting.author)
                    });
                });
            });
            return _.unionBy(users, user => user.id)
        }
    },
    methods: {
        ...mapMutations([
            'setModifyData',
            'setFeedback',
        ]),
        createPerformance(){
            let calculatedScore = parseFloat(this.studentGlobalScore()),
                manualScore = parseFloat(document.getElementById('final').value),
                studentId = this.modalItem.id,
                eventId = this.id,
                softDelete = false;
            
            Bus.$emit('createPerformance', { calculatedScore, manualScore, studentId, eventId, softDelete });

            // Create feedback
            this.feedback = {
                type: 'success',
                message: `La côte finale de ${this.modalItem.name} à bien été validée. Elle est de ${manualScore} sur 20.`,
            }
            
            // Set feedback
            this.setFeedback(this.feedback);

            this.finaleScoreEditable = false;
            this.showTableScoresModal = false;
            this.showAlert = true;
        },
        userScores(userId, studentId){
            let userScores = [];
            this.modalItem.implementations.forEach(implementation => {
                userScores.push(_.filter(implementation.scores, score => {
                    return score.meeting.author.id === userId 
                }))
            })
            userScores.forEach(score => {
                if(score.length === 0) {
                    score[0] = {
                        id: nanoid(),
                        score: "",
                    }
                }
            })
            return _.flatten(userScores);
        },
        implementationGlobalScore(implementation) {
            if(implementation.scores[0]) {
                let globalScore = implementation.scores[0].score;
                let denominator = 1;
                for (let index = 1; index < implementation.scores.length; index++) {
                    if(implementation.scores[index].score) {
                        globalScore = globalScore+implementation.scores[index].score;
                        denominator++
                    }
                }
                return globalScore/denominator
            }
        },
        studentGlobalScore() {
            let allGlobalScores = [];
            this.modalItem.implementations.forEach(implementation => {
                allGlobalScores.push(this.implementationGlobalScore(implementation)*implementation.weight)
            })
            
            allGlobalScores = _.compact(allGlobalScores)
            if(!allGlobalScores[0]) {
                return "Aucun résultat"
            }
            return allGlobalScores.reduce(function(a,b){return a+b;});
        },
        modifyStudentScores(){
            let usersLength = this.users.length-1,
                projectsLength = this.event.projects.length-1,
                i = 0;
            while (i <= usersLength) {
                let y = 0;
                while (y <= projectsLength) {
                    var row = document.querySelector(`table.table tbody .row`+i+` .input`+y),
                        col = row.childNodes[0];
                        if(col.value != ""){
                            var id = col.getAttribute('data-id'),
                                score = parseFloat(col.value);
                        }else{
                            score = null;
                        }
                        if(score != null){
                            Bus.$emit('updateScore', {id, score});
                        }
                    y++;
                }
                i++;
            }
            this.showTableScoresModal = false;
        }
    }
}
</script>

