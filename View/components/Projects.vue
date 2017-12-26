<template>
    <div class="wrapper">
        <section class="hero is-link">
            <div class="hero-body">
                <div class="container">
                <h1 class="title">
                    Tous les projets
                </h1>
                <h2 class="subtitle">
                    Primary subtitle
                </h2>
                </div>
            </div>
        </section>
        <div class="papa">
            <div v-for="(project, key) in allProjects" class="enfant">
                <router-link class="contenu" :to="{name: 'project', params: {id: project.id}}" :href="`/project/${project.id}`">
                    <div class="flex" v-if="!project.softDelete">
                        <div class="flex__header">
                            <h2 class="title">{{project.name}}</h2>
                            <p class="subtitle">subtitle</p>
                        </div>
                        <div class="flex__content">
                            <p>{{project.description}}</p>
                        </div>
                        <div class="flex__footer">
                            <button class="modify"  @click.prevent="showModifyModal = true; setModifyData(project)">Modifier</button>
                            <button id="show-modal" @click.prevent="showDesactivateModal = true; setDesactivateData(project)">Désactiver</button>
                        </div>
                    </div>
                </router-link>
            </div>
            <desactivate v-if="showDesactivateModal" >
                <h3 slot="header">Voullez-vous vraiment désactiver {{modalItem.name}}</h3>
                <div slot="footer">
                    <button @click.prevent="setDesactivateProject(modalItem.id)">Désactiver</button>
                    <button @click.prevent="showDesactivateModal = false">Annuler</button>
                </div>
            </desactivate>
            <modify v-if="showModifyModal" >
                <h3 slot="header">Modification de {{modalItem.name}}</h3>
                <form slot="body">
                    <div class="form-group">
                        <label for="name">Nom</label>
                        <input :value="modalItem.name" type="text" id="name" name="name" placeholder="Écrivez le prénom et nom" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="email">Description</label>
                        <textarea :value="modalItem.description" name="decription" id="description" cols="30" rows="10" class="form-control"></textarea>
                    </div>
                </form>
                <div slot="footer">
                    <button @click.prevent="modifyProject(modalItem.id)">Sauvegarder les modifications</button>
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
import { UPDATE_PROJECT_MUTATION } from '../constants/ProjectUpdate.gql';

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
        }
    },
    computed: {
        ...mapGetters([
            'allProjects',
            'modalItem'
        ])
    }, 
    methods: {
        ...mapActions([
            'setDesactivateProject',
        ]),
        ...mapMutations([
            'setDesactivateData',
            'setModifyData'
        ]),
        modifyProject(projectId){
            let id = projectId;
            let name = document.getElementById("name").value;
            let description = document.getElementById("description").value;
            this.$apollo.mutate({
                mutation: UPDATE_PROJECT_MUTATION,
                variables: {
                    id,
                    name,
                    description, 
                },
            }).then(data => {
                location.reload()
                console.log('Done project modification')
            }).catch(error => {
                console.log('---Project modification failed'  + error)
            });
        }
    },
    actions: {
        ...mapActions([
            'setAllProjects',
        ])
    },
    created(){
        // students recuperation
        this.$store.dispatch('setAllProjects')
    }
}
</script>
