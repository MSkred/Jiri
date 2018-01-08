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
        <md-tabs>
            <md-tab md-label="Jurys">
                <div class="md-layout papa">
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
                <div class="md-layout papa">
                    <div class="enfant" v-for="(student, key) in event.students" >
                        <router-link class="contenu" :to="{name: 'student', params: {id: student.id}}" :href="`/student/${student.id}`">
                            <md-card class="md-primary" md-with-hover>
                                <md-ripple>
                                    <md-card-header>
                                        <div class="md-title">{{student.name}}</div>
                                    </md-card-header>
                                    <md-card-content>
                                        <p>{{student.email}}</p>
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
                <div class="md-layout papa">
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
                <div class="md-layout papa">
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
                            <b-card :header="modalItem.name">
                                <table class="table table-hover">
                                    <caption class="sr-only">Résultats de {{modalItem.name}}</caption>
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
                                                    <td @dblclick="editable = true" v-if="!editable" class="text-center" :key="score.id">{{score.score}}</td>
                                                    <td v-if="editable" :class="'input'+key">
                                                        <input v-if="score.score == ''" disabled type="number" :data-id="score.id" :value="score.score" name="number">
                                                        <input v-else type="number" :data-id="score.id" :value="score.score" name="number">
                                                    </td>
                                                </template>
                                        </tr>
                                        <tr class="table-info">
                                            <th scope="row">évaluations gloables</th>
                                            <td class="text-center" v-for="implementation in modalItem.implementations" :key="implementation.id" scope="row">
                                                <strong>{{implementationGlobalScore(implementation)}}</strong>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <b-badge>Moyenne calculée : {{studentGlobalScore()}}</b-badge>
                                <!-- <b-badge>Moyenne finale : {{studentFinalScore}}</b-badge> -->
                            </b-card>
                        </template>
                    </md-tab>
                </md-tabs>
                <md-dialog-actions>
                    <md-button class="md-primary" @click="showTableScoresModal = false">Fermer</md-button>
                    <md-button v-if="!editable" class="md-accent" @click="editable = true">Modifier</md-button>
                    <md-button v-if="editable" class="md-accent" @click="modifyStudentScores()">Sauvegarder</md-button>
                </md-dialog-actions>
            </md-dialog>
        </div>
    </div>
</template>

<script>
import { SINGLE_EVENT_QUERY } from '../constants/Event.gql'
import {Bus} from '../Bus'
import {mapGetters, mapMutations} from 'vuex'
import _ from 'lodash'
import nanoid from 'nanoid'
import gql from 'graphql-tag'

export default {
    name: 'SingleEvent',
    props: ['id'],
    data(){
        return{
            event: {},
            showTableScoresModal: false,
            editable: false,
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
            }
        },
    },
    computed: {
        ...mapGetters([
            'modalItem',
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
            'setModifyData'
        ]),
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