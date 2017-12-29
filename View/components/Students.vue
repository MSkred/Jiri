<template>
    <div class="wrapper">
        <section class="hero is-link">
            <div class="hero-body">
                <div class="container">
                <h1 class="title">
                    Tous les étudiants
                </h1>
                <h2 class="subtitle">
                    Primary subtitle
                </h2>
                </div>
            </div>
        </section>
      <div class="papa">
            <div class="enfant" v-for="(student, key) in allStudents" >
                <router-link class="contenu" :to="{name: 'student', params: {id: student.id}}" :href="`/student/${student.id}`">
                    <div class="flex" v-if="!student.softDelete">
                        <div class="flex__header">
                            <h2 class="title">{{student.name}}</h2>
                            <p class="subtitle">{{student.email}}</p>
                        </div>
                        <div class="flex__content">
                            <p class="event">{{student.studentEvents.length}} événements</p>
                            <p class="meeting">{{student.implementations.length}} implémentations</p>
                        </div>
                        <div class="flex__footer">
                            <button class="modify"  @click.prevent="showModifyModal = true; setModifyData(student)">Modifier</button>
                            <button id="show-modal" @click.prevent="showDesactivateModal = true; setDesactivateData(student)">Désactiver</button>
                        </div>
                    </div>
                </router-link>
            </div>
            <desactivate v-if="showDesactivateModal" >
                    <h3 slot="header">Voullez-vous vraiment désactiver {{modalItem.name}}</h3>
                    <div slot="footer">
                        <button @click.prevent="setDesactivateStudent(modalItem.id)">Désactiver</button>
                        <button @click.prevent="showDesactivateModal = false">Annuler</button>
                    </div>
            </desactivate>  
            <modify v-if="showModifyModal" >
                <h3 slot="header">Modification de {{modalItem.name}}</h3>
                <form slot="body">
                    <div class="form-group">
                        <label for="name">Prénom et nom</label>
                        <input :value="modalItem.name" type="text" id="name" name="name" placeholder="Écrivez le prénom et nom" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input :value="modalItem.email" type="email" id="email" name="email" placeholder="Écrivez l'adresse mail" class="form-control">
                    </div>
                </form>
                <div slot="footer">
                    <button @click.prevent="modifyStudent(modalItem.id)">Sauvegarder les modifications</button>
                    <button @click.prevent="showModifyModal = false">Annuler</button>
                </div>
            </modify>
      </div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
import Desactivate from './Desactivate.vue';
import Modify from './Modify.vue';
import {Bus} from '../Bus'

import { ALL_STUDENT_QUERY } from '../constants/StudentsAll.gql'
export default {
    name: 'students',
    components: {
        Desactivate,
        Modify
    },
    data(){
        return{
            showDesactivateModal: false,
            showModifyModal: false,
            allStudents: [],
        }
    },
    apollo: {
        allStudents: {
            query: ALL_STUDENT_QUERY,
            update(data){
                return data.allStudents
            }
        },
    },
    computed: {
        ...mapGetters([
            'modalItem'
        ])
    },
    methods: {
        ...mapActions([
            'setDesactivateStudent',
        ]),
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
        }
    },
}
</script>