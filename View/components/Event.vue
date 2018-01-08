
<style>
tr, th, td{
    width: 200px;
    background: yellow;
}
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
            <md-tab md-label="Tableau des scores">
                <!-- <table class="scores" v-for="(student, key) in event.students">
                    <caption>{{student.name}}</caption>
                    <thead>
                        <tr>
                            <th>&nbsp;</th>
                            <th v-for="(meeting, key) in student.meetings">{{meeting.author.name}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(implementation, key) in student.implementations">
                            <td>{{implementation.project.name}}</td>
                            <template v-for="meeting in student.meetings">
                                <template v-for="score in implementation.scores">
                                <td v-if="meeting.id !== score.meeting.id">ok</td>
                                <td v-if="meeting.id == score.meeting.id">{{meeting.author.name}}</td>

                                </template>
                            </template>
                        </tr>
                    </tbody>
                </table> -->
                <template v-for="(student, key) in event.students">
                    <b-card :header="student.name">
                        <table class="table table-hover">
                            <caption class="sr-only">Résultats de {{student.name}}</caption>
                            <thead>
                                <tr class="text-center">
                                    <th scope="col">&nbsp;</th>
                                    <th v-for="implementation in student.implementations" :key="implementation.id" scope="col">{{implementation.project.name}}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in users" :key="user.id">
                                    <th scope="row">{{user.name}}</th>
                                    <td class="text-center" v-for="score in userScores(user.id, student.id)" :key="score.id" v-if="score.score != ''">{{score.score}}</td>
                                </tr>
                                <tr class="table-info">
                                    <th scope="row">évaluations gloables</th>
                                    <td class="text-center" v-for="implementation in student.implementations" :key="implementation.id" scope="row">
                                        <strong>{{implementationGlobalScore(implementation)}}</strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- <b-badge>Moyenne calculée : {{studentGlobalScore()}}</b-badge> -->
                    <!-- <b-badge>Moyenne finale : {{studentFinalScore}}</b-badge> -->
                    </b-card>
                </template>

            </md-tab>
        </md-tabs>
    </div>
    </div>
</template>

<script>
import { SINGLE_EVENT_QUERY } from '../constants/Event.gql'
//import { TABLE_EVENT_QUERY } from '../constants/EventTable.gql'
//import { TABLE_EVENT_SUBSCRIPTION } from '../constants/EventTableSubscription.gql'
import _ from 'lodash'
import nanoid from 'nanoid'
import gql from 'graphql-tag'

export default {
    name: 'SingleEvent',
    props: ['id'],
    data(){
        return{
            event: {},
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
        // allScores(){
        //     let id = this.id;
        //     return {
        //         query: gql`
        //             query allScores($id: ID!){
        //                 allScores(filter: 
        //                     {event_every: { id: $id}}) {
        //                     id
        //                     score
        //                     comment
        //                     implementation{
        //                         id
        //                     }
        //                     meeting{
        //                         id
        //                         author{
        //                             id
        //                         }
        //                     }
        //                 }
        //             }
        //         `,
        //         pollInterval: 300,
        //         variables: {
        //             id
        //         }
        //     }
        // }
    },
    computed: {
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
        userScores(userId, studentId){
            let userScores = [];
            this.event.students.forEach(student => {
                student.implementations.forEach(implementation => {
                    userScores.push(_.filter(implementation.scores, score => {
                        return score.meeting.author.id === userId && score.meeting.student.id === studentId;
                    }))
                });
            })
            userScores.forEach(score => {
                if(score.length === 0) {
                    score[0] = {
                        id: nanoid(),
                        score: "",
                    }
                }
            })
           console.log(_.flatten(userScores))
            return _.flatten(userScores);
        },
        // studentScores(studentId, userId){
        //     let studentScores = [];
        //     this.userScores(userId).forEach(score => {
        //         studentScores.push(_.filter(score.meeting, () => {
        //             return score.meeting.student.id === studentId;
        //         }))
        //     }); 
        //     // studentScores.forEach(score => {
        //     //     if(score.length === 0){
        //     //         score[0] = {
        //     //             id: nanoid(),
        //     //             score: "",
        //     //         }
        //     //     }
        //     // })
        //   console.log(_.flatten(studentScores))
        // },
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
    }
}
</script>