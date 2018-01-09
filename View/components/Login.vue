<template>
  <div>
    <scale-loader v-if="isLoading" color="#448aff" style="height: 90vh;"></scale-loader>
      <template v-else>
        <div class="wrapper">
            <section class="hero is-link">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title">
                            Connexion à Jiri
                        </h1>
                    </div>
                </div>
            </section>
            <ui-alert @dismiss="showAlert = false" v-if="this.feedbackItem" v-show="showAlert" :type="this.feedbackItem.type">
                {{this.feedbackItem.message}}
            </ui-alert>
            <form>
                <md-field >
                    <label for="email">Email</label>
                    <md-input name="email" id="email" type="email" placeholder="Écrivez l'adresse mail" v-model="email" 
                            data-vv-as="Le champs email" 
                            data-vv-validate-on="blur"
                            v-validate="'required|email'"
                            :class="{'is-danger': errors.has('email') }"/>
                </md-field>
                <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                <md-field>
                    <label for="password">Mot de passe</label>
                    <md-input name="password" id="password" type="password" placeholder="Écrivez le mot de passe" v-model="password" 
                            data-vv-as="Le champs mot de passe" 
                            data-vv-validate-on="blur"
                            v-validate="'required|min:4'"
                            :class="{'is-danger': errors.has('password') }"/>
                </md-field>
                <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                <md-button @click="authentification" class="md-dense md-raised md-primary">
                    Se connecter
                </md-button>
            </form>
        </div>
      </template>
  </div>
</template>

<script>

import { LOGIN_USER_MUTATION } from '../constants/UsersLogin.gql'
import {Bus} from '../Bus'
import {mapGetters} from 'vuex'
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import { UiAlert } from 'keen-ui';

export default {
    name: 'login',
    components: {
        ScaleLoader,
        UiAlert,
    },
    data(){
        return{
            email: null, 
            password: null,
            showAlert: false,
            feedbackItem: {
                type: "error",
                message: null,
            },
        }
    },
    computed: {
        ...mapGetters([
            'isLoading'
        ])
    },
    methods: {
        authentification(){
            let {email, password} = this;
            Bus.$emit('authentification', {email, password})
        }
    },
    created(){
        Bus.$on('loginError', payload => {
            this.feedbackItem.message = payload;
            this.showAlert = true;
        })
    }
}
</script>
