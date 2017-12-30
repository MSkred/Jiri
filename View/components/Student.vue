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
                            <h2 class="title">{{implementation.project.name}} du {{implementation.event.courseName}} de {{implementation.event.academicYear}}</h2>
                            <p class="subtitle">{{implementation.weight}}</p>
                        </div>
                        <div class="flex__content">
                            <p>{{implementation.project.description}}</p>
                        </div>
                        <div class="flex__footer" v-if="currentUser.isAdmin">
                            <button class="modify"  @click.prevent="showModifyModal = true; setModifyData(implementation)">Modifier</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <modify v-if="showModifyModal" >
            <h3 slot="header">Modifier la pondération du projet {{modalItem.project.name}}</h3>
            <form slot="body">
                <div class="form-group">
                    <label for="weight">Pondération du projet</label>
                    <input type="number" :value="modalItem.weight" id="weight" name="weight">
                </div>
            </form>
            <div slot="footer">
                <button @click.prevent="modifyImplementation(modalItem.id)">Modifier</button>
                <button @click.prevent="showModifyModal = false">Annuler</button>
            </div>
        </modify>
    </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import Modify from './Modify.vue';
import {Bus} from '../Bus'
import { STUDENT_QUERY } from '../constants/Student.gql'
import { USER_QUERY } from '../constants/User.gql'
export default {
    name: 'student',
    components: {
        Modify
    },
    props: ['id'],
    data(){
        return{
            student: [],
            currentUser: {},
            showModifyModal: false,
        }
    },
    computed: {
        ...mapGetters([
            'modalItem',
            'userId'
        ])
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
                console.log(data)
                return data.Student
            },
        },
        currentUser: {
            query: USER_QUERY,
            variables() {
                // Use vue reactive properties
                return {
                    id: this.userId,
                }
            },
            update(data){
                console.log('User data get done')
                return data.User
            }
        }
    },
    methods: {
        ...mapMutations([
            'setModifyData'
        ]),
        modifyImplementation(implementationId){
            let id = implementationId;
            let weight = parseFloat(document.getElementById("weight").value);
            let studentId = this.id

            Bus.$emit('modifyImplementation', { id, weight, studentId });

            // Close the modify modal
            this.showModifyModal = false;
        }, 
    }
}
</script>
