<template>
    <div class="container">
        <h1>Tous les utilisateurs</h1>
        <div class="container__user user">
            <router-link v-for="(user, key) in users" :to="{name: 'user', params: {id: user.id}}" :href="`/user/${user.id}`">
                <div class="user__item" v-if="!user.softDelete">
                    <h2 class="title">{{user.name}}</h2>
                    <p class="year">{{user.company}}</p>
                    <p class="event">{{user.juryEvents.length}} événements</p>
                    <p class="meeting">{{user.meetings.length}} meetings</p>
                    <button id="show-modal" @click.prevent="showModal = true; setDesactivateData(user.id, user.name)">Désactiver</button>
                </div>
            </router-link>
            <desactivate v-if="showModal" >
                <h3 slot="header">Voullez-vous vraiment désactiver {{desactivateItem.name}}</h3>
                <div slot="footer">
                    <button @click.prevent="setDesactivate(desactivateItem.id)">Désactiver</button>
                    <button @click.prevent="showModal = false">Annuler</button>
                </div>
            </desactivate>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Desactivate from './Desactivate.vue';
export default {
    name: 'users',
    components: {
        Desactivate
    },
    data(){
        return{
            showModal: false,
            desactivateItem: {
                name: null,
                id: null,
            }
        }
    },
    computed: {
        ...mapGetters([
            'users',
        ])
    },
    methods: {
        ...mapActions([
            'setDesactivate',
        ]),
        setDesactivateData(id, name){
            this.desactivateItem.id = id;
            this.desactivateItem.name = name;
        }
    },
    actions: {
        ...mapActions([
            'setAllUsers',
        ])
    },
    created(){
        //Users recuperation
        this.$store.dispatch('setAllUsers')
    }
}
</script>