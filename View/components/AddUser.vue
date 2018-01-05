<template>
  <div>
      <div class="container">
      <h1>Ajouter un utilisateur</h1>
      <form @submit.prevent="validateBeforeSubmit">
            <div class="form-group" :class="{ 'control': true }">
                <label for="name">Prénom et nom</label>
                <input v-model="name" type="text" id="name" name="name" placeholder="Écrivez le prénom et nom" class="form-control"
                data-vv-as="Le champs prénom et nom" 
                data-vv-validate-on="blur"
                v-validate="'required|alpha_spaces|min:5'" 
                :class="{'input': true, 'is-danger': errors.has('name') }">
                <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
            </div>
            <div class="form-group" :class="{ 'control': true }">
                <label for="email">Email</label>
                <input v-model="email" type="email" id="email" name="email" placeholder="Écrivez l'adresse mail" class="form-control"
                data-vv-as="Le champs email" 
                data-vv-validate-on="blur"
                v-validate="'required|email'"
                :class="{'input': true, 'is-danger': errors.has('email') }">
                <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
            </div>
            <div class="form-group">
                <label for="password">Mot de passe</label>
                <input v-model="c_password" type="password" id="password" name="password" placeholder="Écrivez le mot de passe" class="form-control"
                data-vv-as="Le champs mot de passe"
                data-vv-validate-on="blur"
                v-validate="'required|confirmed:c_password|min:4'" 
                :class="{'input': true, 'is-danger': errors.has('password') }">
                <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
            
                <label for="c_password">Comfirmez le mot de passe</label>
                <input v-model="password" type="password" name="c_password" placeholder="Confirmez le mot de passe" class="form-control" data-vv-as="'Confirmez le mot de passe'" 
                data-vv-validate-on="blur"
                v-validate="'required|confirmed:password|min:4'"
                :class="{'input': true, 'is-danger': errors.has('password') }">
            </div>
            <div class="form-group">
                <label for="company">Entreprise</label>
                <input v-model="company" type="text" id="company" name="company" placeholder="Écrivez l'entreprise" class="form-control"
                data-vv-as="Le champs entreprise" 
                data-vv-validate-on="blur"
                v-validate="'alpha_num|min:2'" 
                :class="{'input': true, 'is-danger': errors.has('company') }">
                <span v-show="errors.has('company')" class="help is-danger">{{ errors.first('company') }}</span>
            </div>
            <div class="control">
                <button type="submit" class="button is-primary">Créer un utilisateur</button>
            </div>
      </form>
      </div>
  </div>
</template>
<script>
import {Bus} from '../Bus'

export default {
    name: 'add-user',
    data () {
      return {
        isAdmin: false,
        name: null,
        email: null,
        password: null,
        c_password: null,
        company: null,
        softDelete: false,
      }
    },
    methods: {
        createUser() {
            let {email, password, name, company, isAdmin, softDelete} = this;
            Bus.$emit('createUser', {email, password, name, company, isAdmin, softDelete});
        },
        validateBeforeSubmit() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    // eslint-disable-next-line
                    alert('From Submitted!');
                    this.createUser();
                    
                    Object.assign(this.$data, this.$options.data.apply(this))
                    // this.email = '';
                    // this.name = '';

                    return;
                }

                alert('Corrigez les erreurs');
            });
        }
    },
};
</script>
