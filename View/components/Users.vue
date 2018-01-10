<template>
    <div>
        <scale-loader v-if="isLoading" color="#448aff" style="height: 90vh;"></scale-loader>
        <template v-else>
            <div class="wrapper">
                <section class="hero is-link">
                    <div class="hero-body">
                        <div class="container">
                            <h1 class="title">
                                Tous les utilisateurs
                            </h1>
                            <h2 class="subtitle">
                                <router-link :to="{name: 'addUser'}" :href="`/addUser`">
                                    <md-button class="md-raised">Ajouter un utilisateur</md-button>
                                </router-link>
                            </h2>
                        </div>
                    </div>
                </section>
                <md-empty-state
                    v-if="users <= [0]"
                    md-icon="account_circle"
                    md-label="Aucun utilisateur"
                    md-description="Aucun utilisateur n'a encore été ajouter."
                    class="tabsIsEmpty">
                    <router-link :to="{name: 'addUser'}" :href="`/addUser`">
                        <md-button class="md-raised md-primary">Ajouter un utilisateur</md-button>
                    </router-link>
                </md-empty-state>
                <div v-else class="md-layout papa">
                    <div v-for="(user, key) in users" :key="user.id" class="enfant">
                        <router-link class="contenu" :to="{name: 'user', params: {id: user.id}}" :href="`/user/${user.id}`">
  <zoom-center-transition group >
                                <md-card :key="key" v-if="show" class="md-primary" md-with-hover>
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
  </zoom-center-transition>
                        </router-link>
                    </div>
                    <md-dialog v-if="showDesactivateModal" :md-active.sync="showDesactivateModal" >
                        <md-dialog-title>
                            Voullez-vous vraiment désactiver {{modalItem.name}}
                        </md-dialog-title>
                        <md-dialog-action class="md-dialog-title md-title">
                            <md-button @click.prevent="desactivateUser(modalItem.id)" class="md-accent">
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
                                    <md-field>
                                        <label for="password">Mot de passe</label>
                                        <md-input name="password" id="password" type="password" placeholder="Écrivez le mot de passe" :value="decryptPassword(modalItem.password)" />
                                    </md-field>
                                    <md-field >
                                        <label for="company">Entreprise</label>
                                        <md-input name="company" id="company" placeholder="Écrivez l'entreprise" :value="modalItem.company" />
                                    </md-field>
                                </template>
                            </md-tab>
                        </md-tabs>
                        <md-dialog-actions>
                            <md-button @click.prevent="modifyUser(modalItem.id)" class="md-raised md-primary">
                                Sauvegarder les modifications
                            </md-button>
                            <md-button @click.prevent="showModifyModal = false" class="md-accent">
                                Annuler           
                            </md-button>
                        </md-dialog-actions>
                    </md-dialog>
                </div>
            </div>
        </template>
    </div>
</template>


<script>
import { ALL_USER_QUERY } from '../constants/UsersAll.gql'
import {Bus} from '../Bus'
import {mapGetters, mapMutations} from 'vuex'
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import { decrypt, encrypt } from '../../Model/crypto'

export default {
    name: 'users',
    components: {
        ScaleLoader,
    },
    data(){
        return{
            showDesactivateModal: false,
            showModifyModal: false,
            users: [],
            isLoading: 0,   
            show: false,
        }
    },
    apollo: {
        users: {
            query: ALL_USER_QUERY,
            update(data){
                return data.allUsers
            },
            loadingKey: 'isLoading',
        }
    },
    computed: {
        ...mapGetters([
            'modalItem',
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
            let password = encrypt(document.getElementById("password").value);
            
            Bus.$emit('modifyUser', { id, name, company, email, password });

            // Close the modify modal
            this.showModifyModal = false;
        },
        desactivateUser(userId){
            Bus.$emit('desactivateUser', userId);

            // Close the modify modal
            this.showDesactivateModal = false;
        },
        decryptPassword(password){
            return decrypt(password)
        }
    },
    mounted(){
        this.show = true;
    }
}
</script>

<style lang="scss" scoped>

</style>
