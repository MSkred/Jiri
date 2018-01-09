<template>
  <div>
      <div class="wrapper">
        <section class="hero is-link">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Ajouter un projet
                    </h1>
                </div>
            </div>
        </section>
        <scale-loader v-if="isLoading" color="#448aff" style="height: 90vh;"></scale-loader>
        <template v-else>
            <ui-alert @dismiss="showAlert = false" v-if="this.feedbackItem" v-show="showAlert" :type="this.feedbackItem.type">
                {{this.feedbackItem.message}}
            </ui-alert>
            <form @submit.prevent="validateBeforeSubmit">
                <div class="form-group">
                        <ui-textbox v-model="name" placeholder="Écrivez nom du projet" label="Nom du projet" name="name" id="name" type="text"
                            data-vv-as="Le champs nom du projet" 
                            data-vv-validate-on="blur"
                            v-validate="'required|alpha_spaces|min:2'" 
                            :class="{'is-danger': errors.has('name') }">
                        </ui-textbox>
                        <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
                </div>
                <div class="form-group">
                    <ui-textbox v-model="description" placeholder="Écrivez une petite description du projet" label="Description du projet" 
                        id="description" name="description"
                        enforce-maxlength
                        help="Maximum 256 caractères"
                        :multi-line="true"
                        :maxlength="256"
                        data-vv-as="Le champs déscription du projet" 
                        data-vv-validate-on="blur"
                        v-validate="'min:10|max:256'" 
                        :class="{'is-danger': errors.has('description') }">
                    </ui-textbox>
                    <span v-show="errors.has('description')" class="help is-danger">{{ errors.first('description') }}</span>
                </div>
                <div class="form-group">
                    <ui-textbox label="Pondération du projet" placeholder="Entrez la pondération du projet" v-model="weight"
                    id="weight" name="weight"
                    help="La pondération doit être un nombre entre 0 et 1"
                    type="number"
                    step="0.1"
                    :min="0"
                    :max="1"
                    data-vv-as="Le champs pondération du projet" 
                    data-vv-validate-on="blur"
                    v-validate="'required|min_value:0.1|max_value:1'" 
                    :class="{'is-danger': errors.has('description') }"
                    ></ui-textbox>
                    <span v-show="errors.has('weight')" class="help is-danger">{{ errors.first('weight') }}</span>
                </div>
                <div class="form-group">
                    <ui-button color="primary" buttonType="submit" icon="send" icon-position="right">Créer un projet</ui-button>
                </div>
            </form>
        </template>
      </div>
  </div>
</template>

<script>
import {Bus} from '../Bus'
import {mapGetters, mapMutations} from 'vuex'
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import { UiAlert,UiTextbox, UiButton } from 'keen-ui';

export default {
    name: 'add-project',
    components: {
        UiAlert,
        UiTextbox,
        UiButton,
        ScaleLoader,
    },
    data(){
        return{
            name: null,
            description: null, 
            weight: null,
            softDelete: false,
            showAlert: false,
        }
    },
    computed: {
        ...mapGetters([
            'feedbackItem',
            'isLoading'
        ])
    },
    methods: {
        ...mapMutations([
            'setFeedback',
        ]),
        createProject() {
            let { description, name, softDelete } = this,
                weight = parseFloat(this.weight);
            Bus.$emit('createProject', { description, name, softDelete, weight });
        },
        validateBeforeSubmit() {
            this.$validator.validateAll().then((result) => {
                if (result) {

                    // Create Project
                    this.createProject();
                    
                    // Create feedback
                    this.feedback = {
                        type: 'success',
                        message: `Le projet ${this.name} a bien été créé`,
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
                        message: `Le projet ${this.name} n'a pas été créé car il y a des erreurs. Veuillez les corrigez et réessayer`
                    }

                    // Set feedback
                    this.setFeedback(this.feedback);
                    
                    return this.showAlert = true;
                }
            });
        }
    }
}
</script>
