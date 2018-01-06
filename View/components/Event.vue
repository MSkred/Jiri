
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
                </div>
                <router-link :to="{name: 'addMeeting', params: {id: id}}" :href="`/event/${id}/addMeeting`">
                    Commencer un meeting
                </router-link>
            </div>
        </section>
        <h2>Tableau des scores</h2>
        <table class="scores" v-for="(student, key) in event.students">
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
                    <template v-for="(meeting, key) in student.meetings">
                        <template v-for="(score, key) in allScores">
                            <td v-if="score.implementation.id == implementation.id && score.meeting.id == meeting.id">{{score.score}}</td>
                            <td v-if="(score.implementation.id == implementation.id && score.meeting.id !== meeting.id)">none</td>
                        </template>
                    </template>
                </tr>
            </tbody>
        </table>
        <h2>Les jurys de l'événement</h2>
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
        <h2>Les étudiants de l'événement</h2>
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
        <h2>Les projets de l'événement</h2>
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
        <h2>Les meetings de l'événement</h2>
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
    </div>
    </div>
</template>

<script>
import { SINGLE_EVENT_QUERY } from '../constants/Event.gql'
import { TABLE_EVENT_QUERY } from '../constants/EventTable.gql'
import { TABLE_EVENT_SUBSCRIPTION } from '../constants/EventTableSubscription.gql'
import gql from 'graphql-tag'

export default {
    name: 'SingleEvent',
    props: ['id'],
    data(){
        return{
            event: {},
            tableEvent: {},
        }
    },
    apollo: {
        event: {
            query: SINGLE_EVENT_QUERY,
            pollInterval: 300,
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
        allScores(){
            let id = this.id;
            return {
                query: gql`
                    query allScores($id: ID!){
                        allScores(filter: 
                            {event_every: { id: $id}}) {
                            id
                            score
                            comment
                            implementation{
                                id
                            }
                            meeting{
                                id
                                author{
                                    id
                                }
                            }
                        }
                    }
                `,
                pollInterval: 300,
                variables: {
                    id
                }
            }
        }
    },
}
</script>