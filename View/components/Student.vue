<template>
    <div class="wrapper">
        <section class="hero is-link">
            <div class="hero-body">
                <div class="container">
                <h1 class="title">
                    {{student.name}}
                </h1>
                <h2 class="subtitle">
                    {{student.company}}
                </h2>
                </div>
            </div>
        </section>
        <h2>Les événements de {{student.name}}</h2>
        <div class="papa">
            <div v-for="(event, key) in student.studentEvents" class="enfant">
                <router-link :to="{name: 'event', params: {id: event.id}}" :href="`/event/${event.id}`" class="contenu">
                    <div class="flex" v-if="!event.softDelete">
                        <div class="flex__header">
                            <h2 class="title">{{event.courseName}}</h2>
                            <p class="subtitle">{{event.academicYear}}</p>
                        </div>
                        <div class="flex__content">
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <h2>Les implémentations de {{student.name}}</h2>
        <div class="papa">
            <div v-for="(implementation, key) in student.implementations" class="enfant">
                <div class="contenu">
                    <div class="flex">
                        <div class="flex__header">
                            <h2 class="title">{{implementation.project.name}}</h2>
                            <p class="subtitle">{{implementation.project.weight}}</p>
                        </div>
                        <div class="flex__content">
                            <p>{{implementation.project.description}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { STUDENT_QUERY } from '../constants/Student.gql'

export default {
    name: 'student',
    props: ['id'],
    data(){
        return{
            student: [],
        }
    },
    apollo: {
        student: {
            query: STUDENT_QUERY,
            variables() {
                // Use vue reactive properties
                return {
                    id: this.id,
                }
            },
            update(data){
                return data.Student
            }
        },
    },
}
</script>
