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
        
        <div class="md-layout papa">
            <div class="enfant" v-for="(user, key) in users">
                <router-link class="contenu" :to="{name: 'user', params: {id: user.id}}" :href="`/user/${user.id}`">
                    <md-card class="md-primary" md-with-hover>
                        <md-ripple>
                            <md-card-header>
                                <div class="md-title">{{user.name}}</div>
                                <div class="md-subhead">{{user.company}}</div>
                            </md-card-header>

                            <md-card-content>
                                <p class="event">{{user.juryEvents.length}} événements</p>
                                <p class="meeting">{{user.meetings.length}} meetings</p>
                            </md-card-content>

                            <md-card-actions>
                                <md-button @click.prevent="showModifyModal = true; setModifyData(user)">Modifier</md-button>
                                <md-button @click.prevent="showDesactivateModal = true; setDesactivateData(user)">Désactiver</md-button>
                            </md-card-actions>
                        </md-ripple>
                    </md-card>
                </router-link>
            </div>
            <desactivate v-if="showDesactivateModal" >
                <h3 slot="header">Voullez-vous vraiment désactiver {{modalItem.name}}</h3>
                <div slot="footer">
                    <md-button @click.prevent="desactivateUser(modalItem.id)" class="md-accent">
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
                        <label for="name">Prénom & nom</label>
                        <md-input name="name" id="name" placeholder="Écrivez le prénom et nom" :value="modalItem.name" />
                    </md-field>
                    <md-field >
                        <label for="email">Email</label>
                        <md-input name="email" id="email" type="email" placeholder="Écrivez l'adresse mail" :value="modalItem.email" />
                    </md-field>
                    <md-field>
                        <label for="password">Mot de passe</label>
                        <md-input name="password" id="password" type="password" placeholder="Écrivez le mot de passe" :value="modalItem.password" />
                    </md-field>
                    <md-field >
                        <label for="company">Entreprise</label>
                        <md-input name="company" id="company" placeholder="Écrivez l'entreprise" :value="modalItem.company" />
                    </md-field>
                </form>
                <div slot="footer">
                    <md-button @click.prevent="modifyUser(modalItem.id)" class="md-raised md-primary">
                        Sauvegarder les modifications
                    </md-button>
                    <md-button @click.prevent="showModifyModal = false" class="md-accent">
                        Annuler           
                    </md-button>
                </div>
            </modify>
        </div>
        </div>
    </div>
</template>


<script>
import {mapGetters, mapMutations} from 'vuex'
import Desactivate from './Desactivate.vue';
import Modify from './Modify.vue';
import {Bus} from '../Bus'
import { ALL_USER_QUERY } from '../constants/UsersAll.gql'
import { UiAlert, UiButton, UiIcon } from 'keen-ui';
export default {
    name: 'users',
    components: {
        UiAlert,
        UiButton,
        UiIcon,
        Desactivate,
        Modify,
    },
    data(){
        return{
            showDesactivateModal: false,
            showModifyModal: false,
            users: [],
        }
    },
    apollo: {
        users: {
            query: ALL_USER_QUERY,
            update(data){
                return data.allUsers
            }
        }
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
        modifyUser(userId){
            let id = userId;
            let name = document.getElementById("name").value;
            let company = document.getElementById("company").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            
            Bus.$emit('modifyUser', { id, name, company, email, password });

            // Close the modify modal
            this.showModifyModal = false;
        },
        desactivateUser(userId){
            Bus.$emit('desactivateUser', userId);

            // Close the modify modal
            this.showDesactivateModal = false;
        }
    },
}
</script>