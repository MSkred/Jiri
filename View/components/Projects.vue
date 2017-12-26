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
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
import Desactivate from './Desactivate.vue';
import Modify from './Modify.vue';

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
