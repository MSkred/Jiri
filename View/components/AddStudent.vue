<template>
  <div>
      <div class="container">
      <h1>Ajouter un étudiant</h1>
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
                <ui-button color="primary" buttonType="submit" icon="send" icon-position="right" size="normal">Créer un étudiant</ui-button>
            </div>
        </form>
      </div>
  </div>
</template>

<script>
import {Bus} from '../Bus'
import {mapGetters, mapMutations} from 'vuex'
import { UiAlert, UiTextbox, UiButton } from 'keen-ui';

export default {
    name: 'add-student',
    components: {
        UiAlert,
        UiTextbox,
        UiButton
    },
    data(){
        return{
            name: null,
            email: null,
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
        createStudent() {
            let {email, name, softDelete} = this;
            Bus.$emit('createStudent', {email, name, softDelete});
        },
        validateBeforeSubmit() {
            this.$validator.validateAll().then((result) => {
                if (result) {

                    // Create Student
                    this.createStudent();
                    
                    // Create feedback
                    this.feedback = {
                        type: 'success',
                        message: `L'étudiant ${this.name} a bien été créé`,
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
                        message: `L'étudiant ${this.name} n'a pas été créé car il y a des erreurs. Veuillez les corrigez et réessayer`
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
