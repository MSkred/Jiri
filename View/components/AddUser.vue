<template>
  <div>
      <div class="wrapper">
        <section class="hero is-link">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Ajouter un utilisateur
                    </h1>
                </div>
            </div>
        </section>
        <ui-alert @dismiss="showAlert = false" v-if="this.feedbackItem" v-show="showAlert" :type="this.feedbackItem.type">
            {{this.feedbackItem.message}}
        </ui-alert>
        <form @submit.prevent="validateBeforeSubmit">
                <div class="form-group" :class="{ 'control': true }">
                    <ui-textbox v-model="name" type="text" id="name" name="name" placeholder="Écrivez le prénom et nom"
                        label="Prénom & nom"
                        data-vv-as="Le champs prénom et nom" 
                        data-vv-validate-on="blur"
                        v-validate="'required|alpha_spaces|min:5'" 
                        :class="{'is-danger': errors.has('name') }">
                    </ui-textbox>
                    <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
                </div>
        
                <div class="form-group" :class="{ 'control': true }">
                    <ui-textbox v-model="email" type="email" id="email" name="email"  placeholder="Écrivez l'adresse mail"
                        label="Email"
                        data-vv-as="Le champs email" 
                        data-vv-validate-on="blur"
                        v-validate="'required|email'"
                        :class="{'is-danger': errors.has('email') }">
                    </ui-textbox>
                    <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                </div>
                <div class="form-group">
                    <ui-textbox v-model="c_password" type="password" id="password" name="password"  placeholder="Écrivez le mot de passe"
                        label="Mot de passe"
                        data-vv-as="Le champs mot de passe" 
                        data-vv-validate-on="blur"
                        v-validate="'required|confirmed:c_password|min:4'"
                        :class="{'is-danger': errors.has('password') }">
                    </ui-textbox>
                    <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                    <ui-textbox v-model="password" type="password" id="c_password" name="c_password"  placeholder="Réécrivez le mot de passe"
                        label="Confirmez le mot de passe"
                        data-vv-as="Le champs mot de passe" 
                        data-vv-validate-on="blur"
                        v-validate="'required|confirmed:c_password|min:4'"
                        :class="{'is-danger': errors.has('password') }">
                    </ui-textbox>
                </div>
                <div class="form-group">
                    <ui-textbox v-model="company" type="text" id="company" name="company"  placeholder="Écrivez le nom de l'entreprise"
                        label="Entreprise"
                        data-vv-as="Le champs entreprise" 
                        data-vv-validate-on="blur"
                        v-validate="'alpha_num|min:2'" 
                        :class="{'is-danger': errors.has('company') }">
                    </ui-textbox>
                    <span v-show="errors.has('company')" class="help is-danger">{{ errors.first('company') }}</span>
                </div>
                <div class="control">
                    <ui-button color="primary" buttonType="submit" icon="send" icon-position="right" size="normal">Créer l'utilisateur</ui-button>
                </div>
        </form>
      </div>
  </div>
</template>
<script>
import {Bus} from '../Bus'
import {mapGetters, mapMutations} from 'vuex'
import { UiAlert,UiTextbox, UiButton, UiIcon } from 'keen-ui';

export default {
    name: 'add-user',
    components: {
        UiAlert,
        UiTextbox,
        UiButton,
        UiIcon
    },
    data () {
      return {
        isAdmin: false,
        name: null,
        email: null,
        password: null,
        c_password: null,
        company: null,
        softDelete: false,
        showAlert: false,
        feedback: null,
      }
    },
    computed: {
        ...mapGetters([
            'feedbackItem'
        ])
    },
    methods: {
        ...mapMutations([
            'setFeedback',
        ]),
        createUser() {
            let {email, password, name, company, isAdmin, softDelete} = this;
            Bus.$emit('createUser', {email, password, name, company, isAdmin, softDelete});
        },
        validateBeforeSubmit() {
            this.$validator.validateAll().then((result) => {
                if (result) {

                    // Create User
                    this.createUser();
                    
                    // Create feedback
                    this.feedback = {
                        type: 'success',
                        message: `L'utilisateur ${this.name} a bien été créé`,
                    }

                    // Set feedback
                    this.setFeedback(this.feedback);

                    // Reset data for emptied field
                    Object.assign(this.$data, this.$options.data.apply(this))
                    
                    return this.showAlert = true;
                }else{
                    // Create feedback
                    this.feedback = {
                        type: 'error',
                        message: `L'utilisateur ${this.name} n'a pas été créé car il y a des erreurs. Veuillez les corrigez et réessayer`
                    }

                    // Set feedback
                    this.setFeedback(this.feedback);
                    
                    return this.showAlert = true;
                }
            });
        }
    },
};
</script>
