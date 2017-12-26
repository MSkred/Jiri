<template>
    <div class="wrapper">
        <section class="hero is-link">
            <div class="hero-body">
                <div class="container">
                <h1 class="title">
                    Tous les utilisateurs
                </h1>
                <h2 class="subtitle">
                    Primary subtitle
                </h2>
                </div>
            </div>
        </section>
        <div class="papa">
             <div class="enfant" v-for="(user, key) in users">
                <router-link class="contenu" :to="{name: 'user', params: {id: user.id}}" :href="`/user/${user.id}`">
                    <div class="flex" v-if="!user.softDelete">
                        <div class="flex__header">
                            <h2 class="title">{{user.name}}</h2>
                            <p class="subtitle">{{user.company}}</p>
                        </div>
                        <div class="flex__content">
                            <p class="event">{{user.juryEvents.length}} événements</p>
                            <p class="meeting">{{user.meetings.length}} meetings</p>
                        </div>
                        <div class="flex__footer">
                            <button class="modify"  @click.prevent="showModifyModal = true; setModifyData(user)">Modifier</button>
                            <button id="show-modal" @click.prevent="showDesactivateModal = true; setDesactivateData(user)">Désactiver</button>
                        </div>
                    </div>
                </router-link>
             </div>
            <desactivate v-if="showDesactivateModal" >
                <h3 slot="header">Voullez-vous vraiment désactiver {{modalItem.name}}</h3>
                <div slot="footer">
                    <button @click.prevent="setDesactivateUser(modalItem.id)">Désactiver</button>
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
                    <div class="form-group">
                        <label for="password">Mot de passe</label>
                        <input :value="modalItem.password" type="password" id="password" name="password" placeholder="Écrivez le mot de passe" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="company">Entreprise</label>
                        <input :value="modalItem.company" type="text" id="company" name="company" placeholder="Écrivez l'entreprise" class="form-control">
                    </div>
                </form>
                <div slot="footer">
                    <button @click.prevent="modifyUser(modalItem.id)">Sauvegarder les modifications</button>
                    <button @click.prevent="showModifyModal = false">Annuler</button>
                </div>
            </modify>
        </div>
    </div>
</template>
<style>
    .wrapper{
        padding: 0;
    }
    .papa{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap; 
        margin: 0 50px; 
    }
    .enfant{
        width: 32%;
        background-color: #5182d2;
        margin: 20px 0;
        padding: 20px;
    }
    .contenu .title,
    .contenu .subtitle{
        color: #fff;
    }
    .enfant:nth-child(3n+2){
        margin: 20px;
    }
    .contenu{
        color: #ffffff;
    }
    .flex__header{
        margin: 0 0 36px 0;
    }
    .flex__content{
        margin: 0 0 48px 0;
    }
    .flex__footer{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap; 
    }
    .flex__footer button{
        text-decoration: none;
        border: none;
        background: none;
        color: #9bbbec;
        text-transform: uppercase;
        font-weight: 750;
        width: 50%;
        text-align: left;
    }
    .flex__footer button+button{
        text-align: right;
    }
    .flex__footer button:hover{
        cursor: pointer;
        text-decoration: underline;
    }
</style>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
import Desactivate from './Desactivate.vue';
import Modify from './Modify.vue';
import {UPDATE_USER_MUTATION} from '../constants/UsersUpdate.gql';
export default {
    name: 'users',
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
            'users',
            'modalItem'
        ])
    },
    methods: {
        ...mapActions([
            'setDesactivateUser',
        ]), 
        ...mapMutations([
            'setDesactivateData',
            'setModifyData'
        ]),
        modifyUser(userId){
            let id = userId;
            let name = document.getElementById("name").value;
            let company = document.getElementById("company").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            this.$apollo.mutate({
                mutation: UPDATE_USER_MUTATION,
                variables: {
                    id,
                    name,
                    company,
                    email, 
                    password,
                },
            }).then(data => {
                location.reload()
                console.log('Done user modification')
            }).catch(error => {
                console.log('---user modification failed'  + error)
            });
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
    },
}
</script>