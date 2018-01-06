<template>
    <div class="wrapper">
        <section class="hero is-link">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Tous les projets
                    </h1>
                    <h2 class="subtitle">
                        <router-link :to="{name: 'addProject'}" :href="`/addProject`">
                            <md-button class="md-raised">Créer un projet</md-button>
                        </router-link>
                    </h2>
                </div>
            </div>
        </section>
        <div class="md-layout papa">
            <div v-for="(project, key) in allProjects" class="enfant">
                <md-card class="md-primary" md-with-hover>
                    <md-ripple>
                        <md-card-header>
                            <div class="md-title">{{project.name}}</div>
                            <div class="md-subhead">Pondération de {{project.weight}}</div>
                        </md-card-header>

                        <md-card-content>
                            <p>{{project.description}}</p>
                        </md-card-content>

                        <md-card-actions>
                            <md-button @click.prevent="showModifyModal = true; setModifyData(project)">Modifier</md-button>
                            <md-button @click.prevent="showDesactivateModal = true; setDesactivateData(project)">Désactiver</md-button>
                        </md-card-actions>
                    </md-ripple>
                </md-card>
            </div>
            <desactivate v-if="showDesactivateModal" >
                <h3 slot="header">Voullez-vous vraiment désactiver {{modalItem.name}}</h3>
                <div slot="footer">
                    <md-button @click.prevent="desactivateProject(modalItem.id)" class="md-accent">
                        Désactiver
                    </md-button>
                    <md-button @click.prevent="showDesactivateModal = false" class="md-raised md-primary">
                        Annuler           
                    </md-button>
                </div>
            </desactivate>
            <modify v-if="showModifyModal" >
                <h3 slot="header">Modification de {{modalItem.name}}</h3>
                <form slot="body">
                    <md-field >
                        <label for="name">Nom</label>
                        <md-input name="name" id="name" placeholder="Écrivez le noml du projet" :value="modalItem.name" />
                    </md-field>
                    <md-field>
                        <label for="description">Description</label>
                        <md-textarea :value="modalItem.description" md-counter="256" name="description" id="description"></md-textarea>
                    </md-field>
                    <md-field>
                        <label for="weight">Pondération du projet</label>
                        <md-input type="number" :value="modalItem.weight" id="weight" name="weight" step="0.1"></md-input>
                        <span class="md-helper-text">La pondération doit être un nombre entre 0 et 1</span>
                    </md-field>
                </form>
                <div slot="footer">
                    <md-button @click.prevent="modifyProject(modalItem.id)" class="md-raised md-primary">
                        Sauvegarder les modifications
                    </md-button>
                    <md-button @click.prevent="showModifyModal = false" class="md-accent">
                        Annuler           
                    </md-button>
                </div>
            </modify>  
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
import Desactivate from './Desactivate.vue'
import Modify from './Modify.vue'
import {Bus} from '../Bus'

import { ALL_PROJECT_QUERY } from '../constants/ProjectsAll.gql';

export default {
    name: 'projects',
    components: {
        Desactivate,
        Modify
    },
    data(){
        return{
            showDesactivateModal: false,
            showModifyModal: false,
            allProjects: [],
        }
    },
    apollo: {
        allProjects: {
            query: ALL_PROJECT_QUERY,
            update(data){
                return data.allProjects
            }
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
        modifyProject(projectId){
            let id = projectId;
            let name = document.getElementById("name").value;
            let description = document.getElementById("description").value;
            let weight = parseFloat(document.getElementById("weight").value);
            
            Bus.$emit('modifyProject', { id, name, description, weight });

            // Close the modify modal
            this.showModifyModal = false;
        }, 
        desactivateProject(projectId){
            Bus.$emit('desactivateProject', projectId);

            // Close the modify modal
            this.showDesactivateModal = false;
        }
    },
}
</script>
