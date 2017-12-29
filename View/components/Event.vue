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
        <h2>Les jurys de l'événement</h2>
        <div class="papa">
            <div v-for="(jury, key) in event.jurys" class="enfant">
                <div class="flex" v-if="!jury.softDelete">
                    <div class="flex__header">
                        <h2 class="title">{{jury.name}}</h2>
                        <p class="subtitle">{{jury.company}}</p>
                    </div>
                    <div class="flex__content">
                        <p>{{jury.email}}</p>
                    </div>
                    <div class="flex__footer">
                        <button>Supprimer de l'événement</button>
                    </div>
                </div>
            </div>
        </div>
        <h2>Les étudiants de l'événement</h2>
        <div class="papa">
            <div v-for="(student, key) in event.students" class="enfant">
                <div class="flex" v-if="!student.softDelete">
                    <div class="flex__header">
                        <h2 class="title">{{student.name}}</h2>
                    </div>
                    <div class="flex__content">
                        <p>{{student.email}}</p>
                    </div>
                    <div class="flex__footer">
                        <button>Supprimer de l'événement</button>
                    </div>
                </div>
            </div>
        </div>
        <h2>Les projets de l'événement</h2>
        <div class="papa">
            <div v-for="(project, key) in event.projects" class="enfant">
                <div class="flex" v-if="!project.softDelete">
                    <div class="flex__header">
                        <h2 class="title">{{project.name}}</h2>
                    </div>
                    <div class="flex__content">
                        <p>{{project.description}}</p>
                    </div>
                    <div class="flex__footer">
                        <button>Supprimer de l'événement</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { SINGLE_EVENT_QUERY } from '../constants/Event.gql'

export default {
    name: 'SingleEvent',
    props: ['id'],
    data(){
        return{
            event: [],
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
                console.log(data)
                return data.allEvents[0]
            }
        },
    },
}
</script>
