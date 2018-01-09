<template>
    <div>
        <template>
            <div class="wrapper">
                <section class="hero is-link">
                    <div class="hero-body">
                        <div class="container">
                            <h1 class="title">
                                Tous les étudiants
                            </h1>
                            <h2 class="subtitle">
                                <router-link :to="{name: 'addStudent'}" :href="`/addStudent`">
                                    <md-button class="md-raised">Ajouter un étudiant</md-button>
                                </router-link>
                            </h2>
                        </div>
                    </div>
                </section>
                <scale-loader v-if="isLoading" color="#448aff" style="height: 90vh;"></scale-loader>
                <template v-else>
                    <md-empty-state
                    v-if="allStudents <= [0]"
                    md-icon="face"
                    md-label="Aucun étudiant"
                    md-description="Aucun étudiant n'a encore été ajouter."
                    class="tabsIsEmpty">
                        <router-link :to="{name: 'addStudent'}" :href="`/addStudent`">
                            <md-button class="md-raised md-primary">Ajouter un étudiant</md-button>
                        </router-link>
                    </md-empty-state>
                    <div v-else class="md-layout papa">
                            <div class="enfant" v-for="(student, key) in allStudents" >
                                <router-link class="contenu" :to="{name: 'student', params: {id: student.id}}" :href="`/student/${student.id}`">
                                    <md-card class="md-primary" md-with-hover>
                                        <md-ripple>
                                            <md-card-header>
                                                <div class="md-title">{{student.name}}</div>
                                                <div class="md-subhead">{{student.email}}</div>
                                            </md-card-header>
                                            <md-card-content>
                                                <p class="event">{{student.studentEvents.length}} événements</p>
                                                <p class="meeting">{{student.implementations.length}} implémentations</p>
                                            </md-card-content>
                                            <md-card-actions>
                                                <md-button @click.prevent="showModifyModal = true; setModifyData(student)">Modifier</md-button>
                                                <md-button @click.prevent="showDesactivateModal = true; setDesactivateData(student)">Désactiver</md-button>
                                            </md-card-actions>
                                        </md-ripple>
                                    </md-card>
                                </router-link>
                            </div>  

                            <md-dialog v-if="showDesactivateModal" :md-active.sync="showDesactivateModal" >
                                <md-dialog-title>
                                    Voullez-vous vraiment désactiver {{modalItem.name}} ?
                                </md-dialog-title>
                                <md-dialog-action class="md-dialog-title md-title">
                                    <md-button @click.prevent="desactivateStudent(modalItem.id)" class="md-accent">
                                        Désactiver
                                    </md-button>
                                    <md-button @click.prevent="showDesactivateModal = false" class="md-raised md-primary">
                                        Annuler           
                                    </md-button>
                                </md-dialog-action>
                            </md-dialog>
                            <md-dialog v-if="showModifyModal" :md-active.sync="showModifyModal" >
                                <md-dialog-title>
                                    Modification de {{modalItem.name}}
                                </md-dialog-title>
                                <md-tabs md-dynamic-height>
                                    <md-tab md-label="Modifier">
                                        <template>
                                            <md-field >
                                                <label for="name">Prénom & nom</label>
                                                <md-input name="name" id="name" placeholder="Écrivez le prénom et nom" :value="modalItem.name" />
                                            </md-field>
                                            <md-field >
                                                <label for="email">Email</label>
                                                <md-input name="email" id="email" type="email" placeholder="Écrivez l'adresse mail" :value="modalItem.email" />
                                            </md-field>
                                        </template>
                                    </md-tab>
                                </md-tabs>
                                <md-dialog-actions class="md-dialog-title md-title">
                                    <md-button @click.prevent="modifyStudent(modalItem.id)" class="md-raised md-primary">
                                        Sauvegarder les modifications
                                    </md-button>
                                    <md-button @click.prevent="showModifyModal = false" class="md-accent">
                                        Annuler           
                                    </md-button>
                                </md-dialog-actions>
                            </md-dialog>
                    </div>
                </template>
            </div>
        </template>
    </div>
</template>

<script>
import { ALL_STUDENT_QUERY } from '../constants/StudentsAll.gql'
import {Bus} from '../Bus'
import {mapGetters, mapMutations} from 'vuex'
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'

export default {
    name: 'students',
    components: {
        ScaleLoader,
    },
    data(){
        return{
            showDesactivateModal: false,
            showModifyModal: false,
            allStudents: [],
            isLoading: 0,   
        }
    },
    apollo: {
        allStudents: {
            query: ALL_STUDENT_QUERY,
            update(data){
                return data.allStudents
            },
            loadingKey: 'isLoading',
        },
    },
    computed: {
        ...mapGetters([
            'modalItem'
        ])
    },
    methods: {
        ...mapMutations([
            'setDesactivateData',
            'setModifyData'
        ]),
        modifyStudent(studentId){
            let id = studentId;
            let name = document.getElementById("name").value;
            let email = document.getElementById("email").value;
            
            Bus.$emit('modifyStudent', { id, name, email });

            // Close the modify modal
            this.showModifyModal = false;
        },
        desactivateStudent(studentId){
            Bus.$emit('desactivateStudent', studentId);

            // Close the modify modal
            this.showDesactivateModal = false;
        }
    },
}
</script>