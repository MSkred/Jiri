<template>
  <div>
      <form method="post" action="#">
        <input v-model="isAdmin" type="checkbox" :id="isAdminId">
        <label :for="isAdminId">Administrateur</label>
        
        <label :for="nameId">Nom</label>
        <input v-model="name" type="text" :id="nameId">
        
        <label :for="companyId">Organisation</label>
        <input v-model="company" type="text" :id="companyId">

        <label :for="emailId">Email</label>
        <input v-model="email" type="email" :id="emailId">

        <label :for="passwordId">Mot de passe</label>
        <input v-model="password" type="password" :id="passwordId">

        <a href="#" @click.prevent="randomizePassword" >Générer un mot de passe</a>

        <input @click.prevent="signupUser(name, email)" type="submit">
      </form>
  </div>
</template>

<script>

import { LOGIN_USER_MUTATION } from '../constants/UsersLogin.gql'
export default {
    name: 'login',
    data(){
        return{
            email: null, 
            password: null,
        }
    },
    methods: {
        authentification(){
            const { email, password } = this;
            let res = this.$apollo.mutate({
                mutation: LOGIN_USER_MUTATION,
                variables: {
                    email,
                    password,
                },
            });
            console.log(res);
        }
    }
}
</script>