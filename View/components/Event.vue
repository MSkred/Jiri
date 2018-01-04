
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
        <div class="papa">
            <div v-for="(jury, key) in event.jurys" class="enfant">
                <div class="flex" v-if="!jury.softDelete">
                    <div class="flex__header">
                        <h1 class="title">{{jury.name}}</h1>
                        <p class="subtitle">{{jury.company}}</p>
                    </div>
                    <div class="flex__content">
                        <p>{{jury.email}}</p>
                    </div>
                </div>
            </div>
        </div>
        <h2>Les étudiants de l'événement</h2>
        <div class="papa">
            <div v-for="(student, key) in event.students" class="enfant">
                <div class="flex" v-if="!student.softDelete">
                    <div class="flex__header">
                        <h1 class="title">{{student.name}}</h1>
                    </div>
                    <div class="flex__content">
                        <p>{{student.email}}</p>
                    </div>
                </div>
            </div>
        </div>
        <h2>Les projets de l'événement</h2>
        <div class="papa">
            <div v-for="(project, key) in event.projects" class="enfant">
                <div class="flex" v-if="!project.softDelete">
                    <div class="flex__header">
                        <h1 class="title">{{project.name}}</h1>
                    </div>
                    <div class="flex__content">
                        <p>{{project.description}}</p>
                    </div>
                </div>
            </div>
        </div>
        <h2>Les meetings de l'événement</h2>
        <div class="papa">
            <div v-for="(meeting, key) in event.meetings" class="enfant">
                <div class="flex" v-if="!meeting.softDelete">
                    <div class="flex__header">
                        <h1 class="title">{{meeting.author.name}} & {{meeting.student.name}}</h1>
                        <p class="subtitle">
                            {{meeting.evaluation}} / 20
                        </p>
                    </div>
                    <div class="flex__content">
                        <p>{{meeting.comment}}</p>
                    </div>
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
                variables: {
                    id
                }
            }
        }
    },
    mounted(){
        let id = this.id;
        this.scoreSubscription = this.$apollo.queries.allScores.subscribeToMore({
            document: TABLE_EVENT_SUBSCRIPTION,
            variables: {
                id,
            },
            updateQuery: (previousResult, { subscriptionData }) => {
                console.log(previousResult, subscriptionData)
                return {
                    allScores: [
                        ...previousResult.allScores,
                        // Add the new tag
                        subscriptionData.data.Score.node,
                    ],
                }
            }
        })
    }
}
</script>