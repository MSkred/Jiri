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
                            <md-button class="md-raised">Ajouter un projet</md-button>
                        </router-link>
                    </h2>
                </div>
            </div>
        </section>
        <scale-loader v-if="isLoading" color="#448aff" style="height: 90vh;"></scale-loader>
        <template v-else>
            <md-empty-state
                v-if="allProjects <= [0]"
                md-icon="computer"
                md-label="Aucun projet"
                md-description="Aucun projet n'a encore été ajouter."
                class="tabsIsEmpty">
                <router-link :to="{name: 'addProject'}" :href="`/addProject`">
                    <md-button class="md-raised md-primary">Ajouter un projet</md-button>
                </router-link>
            </md-empty-state>
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
                <md-dialog v-if="showDesactivateModal" :md-active.sync="showDesactivateModal" >
                    <md-dialog-title>
                        Voullez-vous vraiment désactiver {{modalItem.name}} ?
                    </md-dialog-title>
                    <md-dialog-action class="md-dialog-title md-title">
                        <md-button @click.prevent="desactivateProject(modalItem.id)" class="md-accent">
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
                            </template>
                        </md-tab>
                    </md-tabs>
                    <md-dialog-actions class="md-dialog-title md-title">
                        <md-button @click.prevent="modifyProject(modalItem.id)" class="md-raised md-primary">
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

<script>
import {mapGetters, mapMutations} from 'vuex'
import {Bus} from '../Bus'
import { ALL_PROJECT_QUERY } from '../constants/ProjectsAll.gql';
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'

export default {
    name: 'projects',
    components: {
        ScaleLoader,
    },
    data(){
        return{
            showDesactivateModal: false,
            showModifyModal: false,
            allProjects: [],
            isLoading: 0,   
        }
    },
    apollo: {
        allProjects: {
            query: ALL_PROJECT_QUERY,
            update(data){
                return data.allProjects
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
