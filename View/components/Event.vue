
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
        <table class="scores" v-for="(student, key) in tableEvent[0].students">
            <caption>{{student.name}}</caption>
            <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th v-for="(implementation, key) in student.implementations">{{implementation.project.name}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(implementation, key) in student.implementations">
                    <td>&nbsp;</td>
                    <td v-for="(score, key) in implementation.scores">
                        <span v-if="score.score">{{score.score}}</span>
                        <span v-if="!score.score">&nbsp;</span>
                    </td>
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
            //event: [],
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
        tableEvent() {
            let id = this.id;
            return {
                query: TABLE_EVENT_QUERY,
                variables: {
                    id
                },
                update(data){
                    var newEvent = [],
                        students = [],
                        newScore = [];       

                        data.Event.students.map( student => {
                            var implementations = [];                 
                            let name = student.name;
                            student.implementations.map( implementation => {
                                var scores = [];
                                let id = implementation.id,
                                    project = implementation.project;
                                implementation.scores.map( scoore => {
                                    let comment = scoore.comment,
                                        score = scoore.score,
                                        id = scoore.id,
                                        meeting = scoore.meeting;
                                    scores.push({ id, score, comment, meeting });
                                } )
                                implementations.push({ id, project, scores })
                            } )
                            students.push({ name, implementations })
                        } )
                        newScore.push({ courseName: data.Event.courseName, students})
                    
                    return newScore
                },
            }
        },
    },
    mounted(){
        let id = this.id;
        this.tableEventSubscription = this.$apollo.queries.tableEvent.subscribeToMore({
            document: TABLE_EVENT_SUBSCRIPTION,
            variables: {
                id,
            },
            updateQuery: (previousResult, { subscriptionData }) => {
                // Create empty variables
                var newEvent = [],
                    students = [],
                    newScore = [];     


                // Looped on all students in my event
                previousResult.Event.students.map( student => {
                    // Reset implentation array
                    var implementations = [];  
                    
                    // Stock the student name
                    let name = student.name;

                    // Looped on all student's implementation
                    student.implementations.map( implementation => {
                        // Reset score array
                        var scores = [];  

                        // Stock the implementation id & project
                        let id = implementation.id,
                            project = implementation.project;
                        
                        // Looped on all implementation's score
                        implementation.scores.map( scoore => {
                            // Stock score's comment, id, score & meeting
                            let comment = scoore.comment,
                                score = scoore.score,
                                id = scoore.id,
                                meeting = scoore.meeting;

                            // Push object in scores array
                            scores.push({ id, score, comment, meeting });
                           
                        } )

                        // Check if student have an implementation with
                        // the same ID of subscription Data 
                        // if true push it
                        if(implementation.id === subscriptionData.data.Score.node.implementation.id){
                            scores.push(subscriptionData.data.Score.node)
                        }

                        // Push object in implementation array
                        implementations.push({ id, project, scores })
                    
                    })
                    // Push object in student array
                    students.push({ name, implementations })
                })

                newEvent.push({courseName: previousResult.Event.courseName, students })



                var Teststudents = [],
                    addedScore =  subscriptionData.data.Score.node,
                    testScore = [];

                Teststudents.push(...previousResult.Event.students)
                Teststudents.map( student => {
                    if(student.id === addedScore.meeting.student.id){
                        student.implementations.map( implementation => {
                            testScore = [];
                            if(implementation.id === addedScore.implementation.id){
                                //testScore.push(...implementation.scores, addedScore)
                                //implementation.scores = (...implementations.scores)
                            }
                        } )
                    }
                } )
                
                return {
                  tableEvent: [
                    
                  ]
                    // tableEvent: [
                    //     {
                    //         Event: [],
                    //         __typename: previousResult.Event.__typename,
                    //         courseName: previousResult.Event.courseName,
                    //         // ...previousResult.Event.students,
                    //     }
                    //     // subscriptionData.data.Score.node,
                    //     // ...newEvent,
                    //     // __typename: previousResult.Event.__typename,
                    //     // ...newEvent
                    //     //events: [...previousResult, ...newEvent[0]],
                    // ]             
                }
            }
        })
    }
}
</script>